package com.delightloop.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Delightloop Spring Boot Application.
 * <p>
 * {@code @SpringBootApplication} enables component scanning, auto-configuration,
 * and property configuration in a single annotation.
 */
@SpringBootApplication
public class DelightloopApplication {

    public static void main(String[] args) {
        SpringApplication.run(DelightloopApplication.class, args);
    }
}
