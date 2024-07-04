package com.example.userservice.dtos.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
public class CategoryCreateDto {
    @NotEmpty(message = "Category name may not be empty")
    @NotNull(message = "Category name may not be empty")
    @NotBlank(message = "Category name may not be empty")
    private String name;
}
