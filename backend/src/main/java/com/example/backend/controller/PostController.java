package com.example.backend.controller;

import com.example.backend.model.Post;
import com.example.backend.service.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final ObjectMapper objectMapper;
    private final String UPLOAD_DIR = "src/main/uploads/";

    @Autowired
    public PostController(PostService postService, ObjectMapper objectMapper) {
        this.postService = postService;
        this.objectMapper = objectMapper;
    }

    // Get all posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // Get post by ID
    @GetMapping("/{id}")
    public Optional<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // Download uploaded image
    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> downloadPost(@PathVariable String filename) {
        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }

    // Create a new post with image upload
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Post> createPost(
            @RequestPart("post") String postJson,
            @RequestPart("image") MultipartFile imageFile) {

        try {
            Post post = objectMapper.readValue(postJson, Post.class);

            // Save image
            if (!imageFile.isEmpty()) {
                String fileName = imageFile.getOriginalFilename();
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();
                imageFile.transferTo(Paths.get(UPLOAD_DIR + fileName));
                post.setImageUrl("/api/posts/uploads/" + fileName);
            }

            Post savedPost = postService.createPost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
        } catch (IOException e) {
            e.printStackTrace(); // or use logging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update post
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Post> updatePost(
            @PathVariable Long id,
            @RequestPart("post") String postJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {

        try {
            Post updatedData = objectMapper.readValue(postJson, Post.class);
            Optional<Post> existingOpt = postService.getPostById(id);
            if (existingOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Post existing = existingOpt.get();
            existing.setTitle(updatedData.getTitle());
            existing.setContent(updatedData.getContent());
            existing.setTags(updatedData.getTags());
            existing.setLocation(updatedData.getLocation());
            existing.setRating(updatedData.getRating());
            existing.setRestaurantDescription(updatedData.getRestaurantDescription());
            existing.setFoodQuality(updatedData.getFoodQuality());
            existing.setService(updatedData.getService());
            existing.setAtmosphere(updatedData.getAtmosphere());

            if (imageFile != null && !imageFile.isEmpty()) {
                String fileName = imageFile.getOriginalFilename();
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();
                imageFile.transferTo(Paths.get(UPLOAD_DIR + fileName));
                existing.setImageUrl("/api/posts/uploads/" + fileName);
            }

            Post saved = postService.createPost(existing);
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete post
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}
