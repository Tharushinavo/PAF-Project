package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Get post by ID
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    // Create new post
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    // Update existing post
    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setTitle(updatedPost.getTitle());
                    post.setContent(updatedPost.getContent());
                    post.setImageUrl(updatedPost.getImageUrl());
                    post.setTags(updatedPost.getTags());
                    post.setLocation(updatedPost.getLocation());
                    post.setRating(updatedPost.getRating());
                    post.setRestaurantDescription(updatedPost.getRestaurantDescription());
                    post.setFoodQuality(updatedPost.getFoodQuality());
                    post.setService(updatedPost.getService());
                    post.setAtmosphere(updatedPost.getAtmosphere());
                    return postRepository.save(post);
                })
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    // Delete post by ID
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}





