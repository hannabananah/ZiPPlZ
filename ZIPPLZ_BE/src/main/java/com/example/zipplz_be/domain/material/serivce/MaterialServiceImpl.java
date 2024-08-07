package com.example.zipplz_be.domain.material.serivce;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.material.dto.MaterialDTO;
import com.example.zipplz_be.domain.material.dto.MaterialFileDTO;
import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import com.example.zipplz_be.domain.material.entity.Material;
import com.example.zipplz_be.domain.material.repository.MaterialRepository;
import com.example.zipplz_be.domain.model.MaterialFileRelation;
import com.example.zipplz_be.domain.model.UserFileRelation;
import com.example.zipplz_be.domain.model.entity.MajorCategory;
import com.example.zipplz_be.domain.model.repository.MajorCategoryRepository;
import com.example.zipplz_be.domain.model.repository.MaterialFileRelationRepository;
import com.example.zipplz_be.domain.model.repository.UserFileRelationRepository;
import com.example.zipplz_be.domain.model.service.S3Service;
import com.example.zipplz_be.domain.model.service.S3ServiceImpl;
import com.example.zipplz_be.domain.schedule.exception.S3Exception;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.exception.UserNotFoundException;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;
    private final FileRepository fileRepository;
    private final MajorCategoryRepository majorCategoryRepository;
    private final MaterialFileRelationRepository materialFileRelationRepository;
    private final S3Service s3Service;
    private final UserRepository userRepository;
    private final UserFileRelationRepository userFileRelationRepository;

//    @Override
//    public List<MaterialViewDTO> getMaterialList() {
//        List<MaterialViewDTO> materialViews = new ArrayList<>();
//        List<MaterialDTO> materials = materialRepository.getMaterialList();
//        for (MaterialDTO material : materials) {
//            List<MaterialFileDTO> files = fileRepository.getMaterialImg(material.getMaterialSerial());
//            String img = null;
//            if (!files.isEmpty()) {
//                img = files.getFirst().getSaveFile();
//            }
//            MaterialViewDTO materialView = new MaterialViewDTO(material, img);
//            materialViews.add(materialView);
//        }
//        return materialViews;
//    }

    @Override
    public List<MaterialViewDTO> getMaterialList(String category) {

        MajorCategory majorCategory = majorCategoryRepository.findByMajorName(category);
        List<Material> materials = category==null? materialRepository.findAll() : materialRepository.findAllByMajorCategory(majorCategory);
        List<MaterialFileRelation> materialFileList = materials.stream()
                .map(material -> materialFileRelationRepository.findFirstByMaterialSerial(material))
                .collect((Collectors.toList()));

        return materialFileList.stream()
                .map(relation ->
                        MaterialViewDTO.builder()
                                .materialName(relation.getMaterialSerial().getMaterialName())
                                .majorCategory(relation.getMaterialSerial().getMajorCategory().getMajorName())
                                .description(relation.getMaterialSerial().getDescription())
                                .materialPrice(relation.getMaterialSerial().getMaterialPrice())
                                .img(relation.getFileSerial())
                                .build()
                        )
                .collect((Collectors.toList()));
    }

    @Override
    public void saveConvertedImage(MultipartFile image, int userSerial) {

        if (image.isEmpty() || Objects.isNull(image.getOriginalFilename())) {
            throw new S3Exception("파일이 비었습니다.");
        }
        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UserNotFoundException("존재하지 않는 유저입니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);

        String url = s3Service.uploadImage(image);
        File file = fileRepository.findBySaveFile(url);

        UserFileRelation userFileRelation = UserFileRelation.builder()
                .user(user)
                .file(file)
                .build();

        userFileRelationRepository.save(userFileRelation);
    }
}
