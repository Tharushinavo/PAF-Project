package com.example.backend.service;

import com.example.backend.dto.CommentDto;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final NotificationRepository notificationRepository;

    // ✅ Add a comment to a post with validation and clear error messages
    public Comment addComment(Long postId, CommentDto dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("❌ Post not found with ID: " + postId));

        if (dto.getUsername() == null || dto.getUsername().isBlank()) {
            throw new RuntimeException("❌ Username is required to post a comment");
        }

        if (dto.getContent() == null || dto.getContent().isBlank()) {
            throw new RuntimeException("❌ Comment content cannot be empty");
        }

        Comment comment = Comment.builder()
                .username(dto.getUsername())
                .content(dto.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .post(post)
                .build();
        commentRepository.save(comment);

        // Notify post owner about the comment
        Notification notification = Notification.builder()
                .message(dto.getUsername() + " commented on your post.")
                .receiverUsername(post.getUsername())
                .createdAt(LocalDateTime.now())
                .post(post)
                .build();
        notificationRepository.save(notification);

        return comment;
    }

    // ✅ Update a comment with notification
    public Comment updateComment(Long commentId, CommentDto dto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        comment.setContent(dto.getContent());
        comment.setUpdatedAt(LocalDateTime.now());
        commentRepository.save(comment);

        // Notify post owner about the comment update
        Notification notification = Notification.builder()
                .message(dto.getUsername() + " updated a comment on your post.")
                .receiverUsername(comment.getPost().getUsername())
                .createdAt(LocalDateTime.now())
                .post(comment.getPost())
                .build();
        notificationRepository.save(notification);

        return comment;
    }

    // ✅ Delete a comment with notification
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Notify post owner about the comment deletion
        Notification notification = Notification.builder()
                .message(comment.getUsername() + " deleted a comment from your post.")
                .receiverUsername(comment.getPost().getUsername())
                .createdAt(LocalDateTime.now())
                .post(comment.getPost())
                .build();
        notificationRepository.save(notification);

        commentRepository.deleteById(commentId);
    }

    // Add a like to a post
    public Like addLike(Long postId, String username) {
        if (likeRepository.existsByUsernameAndPostId(username, postId)) {
            return null; // Already liked
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        Like like = Like.builder()
                .username(username)
                .createdAt(LocalDateTime.now())
                .post(post)
                .build();
        likeRepository.save(like);

        post.setLikesCount(post.getLikesCount() + 1);
        postRepository.save(post);

        Notification notification = Notification.builder()
                .message(username + " liked your post.")
                .receiverUsername(post.getUsername())
                .createdAt(LocalDateTime.now())
                .post(post)
                .build();
        notificationRepository.save(notification);

        return like;
    }

    // Remove a like from a post
    public void removeLike(Long postId, String username) {
        Like like = likeRepository.findByPostId(postId).stream()
                .filter(l -> l.getUsername().equals(username))
                .findFirst()
                .orElseThrow();

        Post post = like.getPost();

        if (post.getLikesCount() > 0) {
            post.setLikesCount(post.getLikesCount() - 1);
            postRepository.save(post);
        }

        likeRepository.delete(like);
    }

    // Get notifications for a user
    public List<Notification> getNotifications(String username, boolean isRead) {
        return notificationRepository.findByReceiverUsernameAndIsRead(username, isRead);
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    public List<Comment> getCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found for comment listing"));
        return commentRepository.findByPostOrderByCreatedAtAsc(post);
    }
}
