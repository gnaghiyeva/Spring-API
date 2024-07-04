package com.example.userservice.service;

import com.example.userservice.dtos.category.CategoryCreateDto;
import com.example.userservice.dtos.category.CategoryDto;
import com.example.userservice.dtos.category.CategoryUpdateDto;
import com.example.userservice.dtos.product.ProductCreateDto;
import com.example.userservice.dtos.product.ProductDto;
import com.example.userservice.dtos.product.ProductUpdateDto;
import com.example.userservice.payloads.ApiResponse;

import java.util.List;

public interface ProductService {
    ApiResponse create(ProductCreateDto productCreate);

    ApiResponse updateProduct(ProductUpdateDto productUpdateDto, Long id);

    List<ProductDto> getAllProducts();

    ProductDto getProductById(Long id);

    List<ProductDto> getProductsByCategoryId(Long id);

    ApiResponse deleteProduct(Long id);
}
