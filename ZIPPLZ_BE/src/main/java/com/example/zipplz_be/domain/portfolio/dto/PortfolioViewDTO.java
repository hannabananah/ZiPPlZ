package com.example.zipplz_be.domain.portfolio.dto;

import java.util.*;

public class PortfolioViewDTO{
    private int user_serial;
    private int portfolio_serial;
    private String user_name;
    private Integer birth_date;
    private double temp;
    private int field_id;
    private String field_name;
    private double career;
    private List<String> locations;
    private String img;

    public PortfolioViewDTO(PortfolioJoinDTO pjDTO, List<String> locations, String img) {
        this.user_serial = pjDTO.getUser_serial();
        this.portfolio_serial = pjDTO.getPortfolio_serial();
        this.user_name = pjDTO.getUser_name();
        this.birth_date = pjDTO.getBirth_date();
        this.temp = pjDTO.getTemp();
        this.field_id = pjDTO.getField_id();
        this.field_name = pjDTO.getField_name();
        this.career = pjDTO.getCareer();
        this.locations = locations;
        this.img = img;
    }

    public int getUser_serial() {
        return user_serial;
    }

    public void setUser_serial(int user_serial) {
        this.user_serial = user_serial;
    }

    public int getPortfolio_serial() {
        return portfolio_serial;
    }

    public void setPortfolio_serial(int portfolio_serial) {
        this.portfolio_serial = portfolio_serial;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public Integer getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(Integer birth_date) {
        this.birth_date = birth_date;
    }

    public double getTemp() {
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }

    public int getField_id() {
        return field_id;
    }

    public void setField_id(int field_id) {
        this.field_id = field_id;
    }

    public String getField_name() {
        return field_name;
    }

    public void setField_name(String field_name) {
        this.field_name = field_name;
    }

    public double getCareer() {
        return career;
    }

    public void setCareer(double career) {
        this.career = career;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    @Override
    public String toString() {
        return "PortfolioViewDTO{" +
                "user_serial=" + user_serial +
                ", portfolio_serial=" + portfolio_serial +
                ", user_name='" + user_name + '\'' +
                ", birth_date=" + birth_date +
                ", temp=" + temp +
                ", field_id=" + field_id +
                ", field_name='" + field_name + '\'' +
                ", career=" + career +
                ", locations=" + locations +
                ", img='" + img + '\'' +
                '}';
    }
}
