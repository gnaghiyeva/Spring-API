package com.example.userservice.dtos.auth;

import lombok.Data;

@Data
public class LoginDto {
    private String usernameOrEmail;
    private String password;
}