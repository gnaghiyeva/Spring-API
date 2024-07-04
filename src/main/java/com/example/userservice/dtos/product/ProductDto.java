package com.example.userservice.dtos.product;

import com.example.userservice.dtos.category.CategoryDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class ProductDto {
    @NotEmpty(message = "Product name may not be empty")
    @NotNull(message = "Product name may not be empty")
    @NotBlank(message = "Product name may not be empty")
    private String name;
    private String photoUrl;

    @PositiveOrZero(message = "Product price may not be negative")
    private double price;
    private CategoryDto category;
}
