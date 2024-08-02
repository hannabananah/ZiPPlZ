package com.example.zipplz_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ZipplzBeApplication {
	public static void main(String[] args) {
		SpringApplication.run(ZipplzBeApplication.class, args);
	}

}