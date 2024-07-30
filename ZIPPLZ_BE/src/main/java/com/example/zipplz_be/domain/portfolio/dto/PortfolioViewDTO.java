package com.example.zipplz_be.domain.portfolio.dto;

import java.util.*;

public class PortfolioViewDTO extends PortfolioJoinDTO{
    List<String> locations;
    String img;

    public PortfolioViewDTO(PortfolioJoinDTO portfolioJoinDTO, List<String> locations, String img) {
        super(portfolioJoinDTO);
        this.locations = locations;
        this.img = img;
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
                "locations=" + locations +
                ", img='" + img + '\'' +
                ", user_serial=" + user_serial +
                ", portfolio_serial=" + portfolio_serial +
                ", name='" + name + '\'' +
                ", birth_date='" + birth_date + '\'' +
                ", temp=" + temp +
                ", field_id='" + field_id + '\'' +
                ", career=" + career +
                '}';
    }
}
