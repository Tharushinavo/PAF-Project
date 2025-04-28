package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final NotificationRepository notificationRepository;

    // Create post
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    // Add comment
    public Comment addComment(Long postId, Comment comment) {
        Post post = postRepository.findById(postId).orElseThrow();
        comment.setPost(post);
        Comment savedComment = commentRepository.save(comment);

        notificationRepository.save(new Notification(
                null,
                comment.getUsername() + " commented on your post",
                post.getOwnerUsername()
        ));

        return savedComment;
    }

    // Edit comment
    public Comment editComment(Long commentId, String newText) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        comment.setText(newText);
        return commentRepository.save(comment);
    }

    // Delete comment
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    // Like a post
    public Like addLike(Long postId, String username) {
        Post post = postRepository.findById(postId).orElseThrow();
        Like like = new Like();
        like.setUsername(username);
        like.setPost(post);
        Like savedLike = likeRepository.save(like);

        notificationRepository.save(new Notification(
                null,
                username + " liked your post",
                post.getOwnerUsername()
        ));

        return savedLike;
    }

    // Remove like
    public void removeLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }

    // Get all notifications
    public List<Notification> getNotifications(String username) {
        return notificationRepository.findAll()
                .stream()
                .filter(notification -> notification.getReceiverUsername().equals(username))
                .toList();
    }
}

