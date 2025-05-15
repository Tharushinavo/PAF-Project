package com.example.backend.controller;

import com.example.backend.dto.CommentDto;
import com.example.backend.dto.PostDto;
import com.example.backend.model.Comment;
import com.example.backend.model.Like;
import com.example.backend.model.Notification;
import com.example.backend.model.Post;
import com.example.backend.service.PostService;
import com.example.backend.service.SocialService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PostController {

    private final PostService postService;
    private final SocialService socialService;

    @PostMapping
    public Post createPost(@RequestBody PostDto dto) {
        System.out.println("➡️ Received PostDto: " + dto);
        return postService.createPost(dto);
    }


    // Comments
    @PostMapping("/{postId}/comments")
    public Comment addComment(@PathVariable Long postId, @RequestBody CommentDto dto) {
        return socialService.addComment(postId, dto);
    }

    @PutMapping("/comments/{commentId}")
    public Comment updateComment(@PathVariable Long commentId, @RequestBody CommentDto dto) {
        return socialService.updateComment(commentId, dto);
    }

    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        socialService.deleteComment(commentId);
    }

    // Likes
    @PostMapping("/{postId}/likes")
    public Like addLike(@PathVariable Long postId, @RequestParam String username) {
        return socialService.addLike(postId, username);
    }

    @DeleteMapping("/{postId}/likes")
    public void removeLike(@PathVariable Long postId, @RequestParam String username) {
        socialService.removeLike(postId, username);
    }

    // Notifications
    @GetMapping("/notifications/{username}")
    public List<Notification> getNotifications(@PathVariable String username, @RequestParam boolean isRead) {
        return socialService.getNotifications(username, isRead);
    }

    @DeleteMapping("/notifications/{notificationId}")
    public void deleteNotification(@PathVariable Long notificationId) {
        socialService.deleteNotification(notificationId);
    }

    @GetMapping("/{postId}/comments")
    public List<Comment> getComments(@PathVariable Long postId) {
        return socialService.getCommentsForPost(postId);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
        String filename = file.getOriginalFilename();
        file.transferTo(new File("uploads/" + filename));
        return ResponseEntity.ok(filename);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        List<Post> posts = postService.getAllPosts();

        posts.forEach(post -> {
            String fullUrl = "http://localhost:8020/uploads/" + post.getImageUrl();
            post.setImageUrl(fullUrl);
        });

        return posts;
    }
}
