package com.example.backend.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
    private String username;
    private String imageUrl;  // This can be the filename or URL (depends on your upload logic)
    private String review;
    private String location;
    private String tags;
    private int rating;       // Make it int or double; keep consistent with PostResponse
    private int likesCount;

    private List<CommentDto> comments;
}

