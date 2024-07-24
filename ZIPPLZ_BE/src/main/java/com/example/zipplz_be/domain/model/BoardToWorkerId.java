package com.example.zipplz_be.domain.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardToWorkerId implements Serializable {
    private int boardSerial;
    private int workerSerial;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BoardToWorkerId that = (BoardToWorkerId) o;
        return boardSerial == that.boardSerial && workerSerial == that.workerSerial;
    }

    @Override
    public int hashCode() {
        return Objects.hash(boardSerial, workerSerial);
    }
}

