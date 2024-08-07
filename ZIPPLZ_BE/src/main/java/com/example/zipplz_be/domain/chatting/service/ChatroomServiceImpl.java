package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageResponseDTO;
import com.example.zipplz_be.domain.chatting.dto.ChatroomListDTO;
import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.exception.CannotCreateChatroomAloneException;
import com.example.zipplz_be.domain.chatting.exception.ChatroomForbiddenException;
import com.example.zipplz_be.domain.chatting.exception.ChatroomNotFoundException;
import com.example.zipplz_be.domain.chatting.repository.jpa.ChatroomRepository;
import com.example.zipplz_be.domain.chatting.repository.mongodb.ChatMessageRepository;
import com.example.zipplz_be.domain.chatting.repository.redis.RedisRepository;
import com.example.zipplz_be.domain.model.entity.Status;
import com.example.zipplz_be.domain.model.repository.FieldRepository;
import com.example.zipplz_be.domain.portfolio.repository.CustomerReviewRepository;
import com.example.zipplz_be.domain.portfolio.repository.PortfolioRepository;
import com.example.zipplz_be.domain.portfolio.service.CustomerReviewService;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import com.example.zipplz_be.global.util.Calculator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ChatroomServiceImpl implements ChatroomService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final ChatroomRepository chatroomRepository;
    private final RedisRepository redisRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final WorkerRepository workerRepository;

    private static final Map<String, Integer> CONSTRUCTION_FIELDS = Map.ofEntries(
            Map.entry("기타", 0),
            Map.entry("철거", 1),
            Map.entry("설비", 2),
            Map.entry("샷시", 3),
            Map.entry("목공", 4),
            Map.entry("전기", 5),
            Map.entry("욕실", 6),
            Map.entry("타일", 7),
            Map.entry("마루", 8),
            Map.entry("도배", 9),
            Map.entry("가구", 10)
    );
    private final PortfolioRepository portfolioRepository;
    private final FieldRepository fieldRepository;
    private final CustomerReviewRepository customerReviewRepository;
    private final CustomerReviewService customerReviewService;

    @Override
    public int createChatroom(int userSerial, CreateChatroomDTO createChatroomDTO) {

        if (createChatroomDTO.getAnotherUserSerial() == userSerial) {
            throw new CannotCreateChatroomAloneException("자기 자신과의 채팅방은 생성할 수 없습니다.");
        }
        if (!userRepository.existsByUserSerial(userSerial) || !userRepository.existsByUserSerial(createChatroomDTO.getAnotherUserSerial())) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);
        User anotherUser = userRepository.findByUserSerial(createChatroomDTO.getAnotherUserSerial());

        User cUser = customerRepository.existsByUserSerial(user) ? user : anotherUser;
        User wUser = customerRepository.existsByUserSerial(user) ? anotherUser : user;
        String fieldName = createChatroomDTO.getField();

        if (chatroomRepository.existsByStatusAndCuserAndWuserAndFieldName(Status.ACTIVE, cUser, wUser, fieldName)) {
            Chatroom savedChatroom =chatroomRepository.findByCuserAndWuserAndStatusAndFieldName(cUser, wUser, Status.ACTIVE, fieldName);
            return savedChatroom.getChatroomSerial();
        }

        Chatroom newChatroom = Chatroom.builder()
                .cuser(cUser)
                .wuser(wUser)
                .fieldName(fieldName).build();
        chatroomRepository.save(newChatroom);

        return newChatroom.getChatroomSerial();
    }

    @Override
    public List<ChatroomListDTO> getChatroomList(int userSerial, String role, Pageable pageable) {

        // 1. 사용자 userSerial로 사용자 목록을 페이지네이션하여 조회
        User user = userRepository.findByUserSerial(userSerial);
        Page<Chatroom> chatroomPage;
        if (role.equals("customer")) {
            chatroomPage = (Page<Chatroom>) chatroomRepository.findAllByCuserAndStatus(user, Status.ACTIVE, pageable);
        } else {
            chatroomPage = (Page<Chatroom>) chatroomRepository.findAllByWuserAndStatus(user, Status.ACTIVE, pageable);
        }

        // 2. 조회된 결과를 스트림으로 변환
        Stream<Chatroom> chatroomStream = chatroomPage.getContent().stream();

        // 3. 각 Chatroom 객체를 ChatroomListDTO 객체로 변환
        Stream<ChatroomListDTO> chatroomListDtoStream = chatroomStream.map(chatroom -> createChatroomListDto(chatroom, userSerial));

        // 4. 변환된 ChatroomListDTO 객체들을 리스트로 수집
        return chatroomListDtoStream.collect(Collectors.toList());
    }

    private ChatroomListDTO createChatroomListDto(Chatroom chatroom, int userSerial) {
        int chatroomSerial = chatroom.getChatroomSerial();
        String roomSerial = Integer.toString(chatroomSerial);
        int unReadMessageCount = redisRepository.getChatRoomMessageCount(roomSerial, userSerial);

        Optional<ChatMessage> lastMessageOpt = chatMessageRepository
                .findFirstByChatroomSerialOrderByCreatedAtDesc(chatroomSerial);

        String lastMessage = lastMessageOpt.map(ChatMessage::getChatMessageContent).orElse("채팅방이 생성되었습니다.");

        String fieldName = chatroom.getFieldName();
        String workerName = chatroom.getWuser().getUserName();
        String customerName = chatroom.getCuser().getUserName();
        Worker worker = workerRepository.findByUserSerial(chatroom.getWuser());
        boolean isCertificated = (worker.getCertificatedBadge() == 1);
        double temperature = customerReviewService.calculateAverageStars(portfolioRepository.findByWorkerAndFieldId(worker, fieldRepository.findByFieldName(fieldName)));

        LocalDateTime lastTime = lastMessageOpt.map(ChatMessage::getCreatedAt).orElse(LocalDateTime.now());

        long dayBeforeTime = ChronoUnit.MINUTES.between(lastTime, LocalDateTime.now());
        String dayBefore = Calculator.time(dayBeforeTime);

        ChatroomListDTO chatroomDTO = new ChatroomListDTO(roomSerial, lastMessage, fieldName, workerName, customerName, isCertificated, temperature, lastTime, dayBefore, unReadMessageCount);
        System.out.println(chatroomDTO);
        return chatroomDTO;
    }

    @Override
    public List<ChatMessageResponseDTO> getPreviousMessage(int chatroomSerial, int userSerial) {
        if (!chatroomRepository.existsByChatroomSerialAndStatus(chatroomSerial, Status.ACTIVE)) {
            throw new ChatroomNotFoundException("해당 채팅방이 존재하지 않습니다.");
        }
        Chatroom chatroom = chatroomRepository.findByChatroomSerialAndStatus(chatroomSerial, Status.ACTIVE);

        boolean isUserInChatroom = ((chatroom.getCuser().getUserSerial() == userSerial)
                || (chatroom.getWuser().getUserSerial() == userSerial));

        if (!isUserInChatroom) throw new ChatroomForbiddenException("잘못된 접근입니다.");

        System.out.println(chatMessageRepository.findAllByChatroomSerialOrderByCreatedAtDesc(chatroomSerial));
        return chatMessageRepository.findAllByChatroomSerialOrderByCreatedAtDesc(chatroomSerial)
                .stream()
                .map(ChatMessageResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteChatroom(int chatroomSerial, int userSerial) {
        if (!chatroomRepository.existsByChatroomSerialAndStatus(chatroomSerial, Status.ACTIVE)) {
            throw new ChatroomNotFoundException("해당 채팅방이 존재하지 않습니다.");
        }
        Chatroom chatroom = chatroomRepository.findByChatroomSerialAndStatus(chatroomSerial, Status.ACTIVE);
        chatroomRepository.save(chatroom.inActive());
    }

//    public double calculateTemperature(Worker worker, String fieldName) {
//        Field field = fieldRepository.findByFieldName(fieldName);
//        Portfolio portfolio = portfolioRepository.findByWorkerAndFieldId(worker, field);
//        customerReviewRepository.findAllByPortfolioSerial(portfolio);
//    }
}
