package com.example.zipplz_be.domain.webrtc.controller;


import java.util.*;

import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/openvidu")
public class openviduController {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    //세션 생성
    @PostMapping("/api/sessions")
    public ResponseEntity<ResponseDTO<String>> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        ResponseDTO<String> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            if(params.get("customSessionId") == null || params.get("customSessionId") == "") {
                status = HttpStatus.BAD_REQUEST;
                responseDTO = new ResponseDTO<>(status.value(), "세션 아이디를 입력해주세요.");
            }
            else {
                SessionProperties properties = SessionProperties.fromJson(params).build();
                Session session = openvidu.createSession(properties);

                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "응답 성공", session.getSessionId());
            }

        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //세션 정보 조회
    @PostMapping("/api/sessions/info")
    public ResponseEntity<ResponseDTO<?>> getSessionInfo(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        ResponseDTO<Session> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            Session session = openvidu.getActiveSession((String) params.get("sessionId"));

            if (session == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", session);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }


    //해당 클라이언트를 세션에서 연결 삭제
    @DeleteMapping("/api/sessions")
    public ResponseEntity<ResponseDTO<?>> deleteSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        ResponseDTO<String> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            //토큰을 받고, 해당 토큰을 가진 connection 객체를 가져와서 그 연결을 session에서 해제한다.
            Session session = openvidu.getActiveSession((String) params.get("sessionId"));
            String connectionId = "";

            //세션이 없으면 404
            if(session == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션이 존재하지 않음");
            }
            else {
                //세션의 연결된 유저 리스트 중 해당 토큰과 똑같은 값을 가진 커넥션 아이디를 뽑아와야 한다!!
                List<Connection> connectionList = session.getConnections();

                for(Connection c : connectionList) {
                    if(c.getToken().equals(params.get("token"))) {
                        connectionId = c.getConnectionId();
                        break;
                    }
                }

                if(connectionId.isEmpty()) {
                    status = HttpStatus.NOT_FOUND;
                    responseDTO = new ResponseDTO<>(status.value(), "해당 토큰을 가진 커넥션이 존재하지 않음");
                }
                else {
                    session.forceDisconnect(connectionId);

                    status = HttpStatus.OK;
                    responseDTO = new ResponseDTO<>(status.value(), "삭제 완료");
                }
            }
        }catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //connection 생성, 토큰 발급
    @PostMapping("/api/sessions/connections")
    public ResponseEntity<ResponseDTO<String>> createConnection(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        ResponseDTO<String> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            Session session = openvidu.getActiveSession((String) params.get("sessionId"));

            if (session == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "그런 세션은 없습니다.");
            }
            else {
                ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
                Connection connection = session.createConnection(properties);

                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "응답 성공" ,connection.getToken());
            }
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }


    //녹화 시작
    @PostMapping("/api/sessions/connections")


    //녹화 종료



    //녹화된 파일 조회

}
