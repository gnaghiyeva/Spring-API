package com.example.userservice.controller;

import com.example.userservice.dtos.category.CategoryCreateDto;
import com.example.userservice.dtos.category.CategoryDto;
import com.example.userservice.dtos.category.CategoryUpdateDto;
import com.example.userservice.entity.Category;
import com.example.userservice.payloads.ApiResponse;
import com.example.userservice.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CategoryCreateDto categoryCreate) {
       ApiResponse response = categoryService.create(categoryCreate);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@Valid @RequestBody CategoryUpdateDto categoryUpdate, @PathVariable Long id) {
        ApiResponse response = categoryService.updateCategory(categoryUpdate, id);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAll(){
        List<CategoryDto> result = categoryService.getAllCategories();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long id) {
        CategoryDto categoryDto = categoryService.getCategoryById(id);
        return new ResponseEntity<>(categoryDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        ApiResponse response = categoryService.deleteCategory(id);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}
