package com.ming;

import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.annotation.MapperScans;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.ming.mapper")
public class SchoolFitnessApplication {

    public static void main(String[] args) {
        SpringApplication.run(SchoolFitnessApplication.class, args);
    }

}
