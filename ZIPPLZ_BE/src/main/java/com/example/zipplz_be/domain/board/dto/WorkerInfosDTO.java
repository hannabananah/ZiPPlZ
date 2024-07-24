package com.example.zipplz_be.domain.board.dto;

import java.util.*;

public class WorkerInfosDTO {
    String name;
    String birth_date;
    float temp;
    List<String> location;
    HashMap<String, Integer> field_career;

    public WorkerInfosDTO(String birth_date, float temp, String name, List<String> location, HashMap<String, Integer> field_career) {
        this.birth_date = birth_date;
        this.temp = temp;
        this.name = name;
        this.location = location;
        this.field_career = field_career;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(String birth_date) {
        this.birth_date = birth_date;
    }

    public float getTemp() {
        return temp;
    }

    public void setTemp(float temp) {
        this.temp = temp;
    }

    public HashMap<String, Integer> getField_career() {
        return field_career;
    }

    public void setField_career(HashMap<String, Integer> field_career) {
        this.field_career = field_career;
    }

    public List<String> getLocation() {
        return location;
    }

    public void setLocation(List<String> location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "WorkerInfos{" +
                "name='" + name + '\'' +
                ", birth_date='" + birth_date + '\'' +
                ", temp=" + temp +
                ", location=" + location +
                ", field_career=" + field_career +
                '}';
    }
}
