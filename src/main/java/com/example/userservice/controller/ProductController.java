package com.example.userservice.controller;

import com.example.userservice.dtos.category.CategoryCreateDto;
import com.example.userservice.dtos.product.ProductCreateDto;
import com.example.userservice.dtos.product.ProductDto;
import com.example.userservice.dtos.product.ProductUpdateDto;
import com.example.userservice.payloads.ApiResponse;
import com.example.userservice.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody ProductCreateDto productCreate) {
        ApiResponse response = productService.create(productCreate);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @RequestBody ProductUpdateDto productUpdate) {
        ApiResponse response = productService.updateProduct(productUpdate,id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("category/{categoryId}")
    public ResponseEntity<List<ProductDto>> getByCategories(@PathVariable Long categoryId) {
       List<ProductDto> response = productService.getProductsByCategoryId(categoryId);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable Long id){
        ProductDto response = productService.getProductById(id);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAll(){
        List<ProductDto> response = productService.getAllProducts();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        ApiResponse response = productService.deleteProduct(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
