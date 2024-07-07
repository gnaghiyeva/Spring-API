package com.example.userservice.payloads;

import com.example.userservice.entity.Category;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
    private Object data; // You can use Object to hold any type of data

    // Constructors, getters and setters
    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse(boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

}
