package com.example.zipplz_be.domain.model.dto;

import com.example.zipplz_be.global.util.NetworkUtil;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseObjectDTO<T> {
    private Conn conn;
    private Proc proc;
    private T data;

    public ResponseObjectDTO() {
        this.conn = new Conn();
        this.proc = new Proc();
    }

    public ResponseObjectDTO(T data) {
        this.conn = new Conn();
        this.proc = new Proc();
        this.data = data;
    }

    public static class Conn {
        private boolean networkConnected;

        public Conn() {
            // 나중에 연결되는 url 체크해야 함. 현재는 일단 다 true 처리.
//            this.networkConnected = NetworkUtil.isNetworkConnected();
            this.networkConnected = true;
        }
    }

    public static class Proc {
        private int errorCode;
        private String errorMessage;

        public Proc() {
            this.errorCode = 0; // 기본값으로 에러코드 0으로 설정.
            this.errorMessage = "Success";
        }

        public int getErrorCode() {
            return errorCode;
        }

        public void setErrorCode(int errorCode) {
            this.errorCode = errorCode;
        }

        public String getErrorMessage() {
            return errorMessage;
        }

        public void setErrorMessage(String errorMessage) {
            this.errorMessage = errorMessage;
        }
    }

}