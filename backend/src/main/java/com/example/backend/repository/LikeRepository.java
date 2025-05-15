package com.example.backend.repository;

import com.example.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByPostId(Long postId); // Find likes by post id
    boolean existsByUsernameAndPostId(String username, Long postId); // Check if user liked the post
}
