package com.example.zipplz_be.domain.portfolio.dto;

public class PortfolioJoinDTO {
    int user_serial;
    int portfolio_serial;
    String name;
    String birth_date;
    float temp;
    String field_id;
    double career;

    public PortfolioJoinDTO(int user_serial, int portfolio_serial, String birth_date, String name, float temp, String field_id, String location, double career, String img) {
        this.user_serial = user_serial;
        this.portfolio_serial = portfolio_serial;
        this.birth_date = birth_date;
        this.name = name;
        this.temp = temp;
        this.field_id = field_id;
        this.career = career;
    }

    public PortfolioJoinDTO(PortfolioJoinDTO other) {
        this.user_serial = other.user_serial;
        this.portfolio_serial = other.portfolio_serial;
        this.birth_date = other.birth_date;
        this.name = other.name;
        this.temp = other.temp;
        this.field_id = other.field_id;
        this.career = other.career;
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

    public String getField_id() {
        return field_id;
    }

    public void setField_id(String field_id) {
        this.field_id = field_id;
    }

    public double getCareer() {
        return career;
    }

    public void setCareer(double career) {
        this.career = career;
    }

    @Override
    public String toString() {
        return "PortfolioJoinDTO{" +
                "user_serial=" + user_serial +
                ", portfolio_serial=" + portfolio_serial +
                ", name='" + name + '\'' +
                ", birth_date='" + birth_date + '\'' +
                ", temp=" + temp +
                ", field_id='" + field_id + '\'' +
                ", career=" + career +
                '}';
    }
}
