package com.example.userservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Category name may not be empty")
    @NotNull(message = "Category name may not be empty")
    @NotBlank(message = "Category name may not be empty")
    private String name;

    private String photoUrl;

    @PositiveOrZero(message = "Product price may not be negative")
    private double price;

    @ManyToOne
    private Category category;

}
