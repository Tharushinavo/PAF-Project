package com.example.backend.service;

import com.example.backend.dto.PostDto;
import com.example.backend.model.Post;
import com.example.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public Post createPost(PostDto dto) {
        System.out.println("🛠 Creating post for: " + dto.getUsername());

        Post post = Post.builder()
                .username(dto.getUsername())
                .imageUrl(dto.getImageUrl())
                .review(dto.getReview())
                .location(dto.getLocation())
                .tags(dto.getTags())
                .rating(dto.getRating())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return postRepository.save(post);
    }


    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public Post updatePost(Long id, PostDto dto) {
        Post post = postRepository.findById(id).orElse(null);
        if (post == null) return null;

        post.setImageUrl(dto.getImageUrl());
        post.setReview(dto.getReview());
        post.setLocation(dto.getLocation());
        post.setTags(dto.getTags());
        post.setRating(dto.getRating());
        post.setUpdatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
