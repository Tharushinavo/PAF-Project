package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This maps /api/posts/uploads/** to the actual uploads directory
        String uploadPath = Paths.get("src/main/uploads").toAbsolutePath().toUri().toString();

        registry.addResourceHandler("/api/posts/uploads/**")
                .addResourceLocations(uploadPath);
    }
}

