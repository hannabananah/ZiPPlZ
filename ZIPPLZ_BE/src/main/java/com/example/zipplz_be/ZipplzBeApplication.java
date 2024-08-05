package com.example.zipplz_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@EnableMongoRepositories(basePackages = "com.example.zipplz_be.domain.chatting.repository.mongodb")
@EnableJpaRepositories(basePackages = {
		"com.example.zipplz_be.domain.chatting.repository.jpa", // MongoDB 리포지토리 패키지를 제외한 모든 리포지토리 패키지
		"com.example.zipplz_be.domain.board.repository",
		"com.example.zipplz_be.domain.file.repository",
		"com.example.zipplz_be.domain.material.repository",
		"com.example.zipplz_be.domain.model.repository",
		"com.example.zipplz_be.domain.mypage.repository",
		"com.example.zipplz_be.domain.plan.repository",
		"com.example.zipplz_be.domain.portfolio.repository",
		"com.example.zipplz_be.domain.file.repository",
		"com.example.zipplz_be.domain.schedule.repository",
		"com.example.zipplz_be.domain.user.repository"
},
		excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = "com\\.example\\.zipplz_be\\.domain\\.chatting\\.repository\\.mongodb\\..*")
)
@EnableJpaAuditing
@EnableMongoAuditing
@SpringBootApplication
public class ZipplzBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZipplzBeApplication.class, args);
	}

}