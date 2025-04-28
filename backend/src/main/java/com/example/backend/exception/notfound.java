package com.example.backend.exception;

public class notfound extends RuntimeException {
     public notfound(Long id) {
         super("Not found id " + id);
     }
    public notfound(String message) {
         super(message);
    }
}
