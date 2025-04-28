package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SocialController {

    private final SocialService socialService;

    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        return socialService.createPost(post);
    }

    @PostMapping("/posts/{postId}/comments")
    public Comment addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        return socialService.addComment(postId, comment);
    }

    @PutMapping("/comments/{commentId}")
    public Comment editComment(@PathVariable Long commentId, @RequestBody String newText) {
        return socialService.editComment(commentId, newText);
    }

    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        socialService.deleteComment(commentId);
    }

    @PostMapping("/posts/{postId}/likes")
    public Like addLike(@PathVariable Long postId, @RequestParam String username) {
        return socialService.addLike(postId, username);
    }

    @DeleteMapping("/likes/{likeId}")
    public void removeLike(@PathVariable Long likeId) {
        socialService.removeLike(likeId);
    }

    @GetMapping("/notifications/{username}")
    public List<Notification> getNotifications(@PathVariable String username) {
        return socialService.getNotifications(username);
    }
}
