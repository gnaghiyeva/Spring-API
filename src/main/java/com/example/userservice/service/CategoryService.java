package com.example.userservice.service;

import com.example.userservice.dtos.category.CategoryCreateDto;
import com.example.userservice.dtos.category.CategoryDto;
import com.example.userservice.dtos.category.CategoryUpdateDto;
import com.example.userservice.entity.Category;
import com.example.userservice.payloads.ApiResponse;

import java.util.List;

public interface CategoryService {
    ApiResponse create(CategoryCreateDto categoryCreate);

    List<CategoryDto> getAllCategories();

    CategoryDto getCategoryById(Long id);

    ApiResponse updateCategory(CategoryUpdateDto categoryUpdateDto, Long id);

    ApiResponse deleteCategory(Long id);
}
