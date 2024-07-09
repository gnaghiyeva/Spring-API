package com.example.userservice.dtos.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductCreateDto {
    @NotEmpty(message = "Product name may not be empty")
    @NotNull(message = "Product name may not be empty")
    @NotBlank(message = "Product name may not be empty")
    private String name;
   // private String photoUrl;
   private MultipartFile photoFile;

    @PositiveOrZero(message = "Product price may not be negative")
    private double price;
    private Long categoryId;
}
