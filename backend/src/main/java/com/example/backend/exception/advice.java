package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class advice {
    @ResponseBody
    @ExceptionHandler(notfound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)

    public Map<String, String>ExceptionHandler(notfound exception){
        Map<String, String> errormap = new HashMap<>();
        errormap.put("error message", exception.getMessage());
        return errormap;
    }

}

