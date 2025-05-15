package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String imageUrl; // or path

    private String review;

    private String location;

    private String tags;

    private double rating;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private int likesCount;

}
