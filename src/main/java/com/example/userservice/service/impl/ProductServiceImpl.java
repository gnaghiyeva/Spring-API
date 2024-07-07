package com.example.userservice.service.impl;

import com.example.userservice.dtos.category.CategoryDto;
import com.example.userservice.dtos.product.ProductCreateDto;
import com.example.userservice.dtos.product.ProductDto;
import com.example.userservice.dtos.product.ProductUpdateDto;
import com.example.userservice.entity.Category;
import com.example.userservice.entity.Product;
import com.example.userservice.exceptions.ResourceNotFoundException;
import com.example.userservice.payloads.ApiResponse;
import com.example.userservice.repository.ProductRepository;
import com.example.userservice.service.CategoryService;
import com.example.userservice.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl  implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ApiResponse create(ProductCreateDto productCreate) {
        Product product = modelMapper.map(productCreate, Product.class);
        CategoryDto category = categoryService.getCategoryById(productCreate.getCategoryId());
        Category mapCategory = modelMapper.map(category, Category.class);
        product.setCategory(mapCategory);
        productRepository.save(product);
        return new ApiResponse(true,"Product created successfully!");
    }

    @Override
    public ApiResponse updateProduct(ProductUpdateDto productUpdate, Long id) {
        Product findproduct = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        if (productUpdate.getName() != null) {
            findproduct.setName(productUpdate.getName());
        }
        if (productUpdate.getPrice() != 0) {
            findproduct.setPrice(productUpdate.getPrice());
        }
        if (productUpdate.getPhotoUrl() != null) {
            findproduct.setPhotoUrl(productUpdate.getPhotoUrl());
        }
        if (productUpdate.getCategoryId() != null) {
            CategoryDto category = categoryService.getCategoryById(productUpdate.getCategoryId());
            Category mapCategory = modelMapper.map(category, Category.class);
            findproduct.setCategory(mapCategory);
        }

        Product updatedProduct = productRepository.save(findproduct);
        return new ApiResponse(true, "Product updated successfully", updatedProduct.getName());
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> result = products.stream().map(product -> modelMapper.map(product,ProductDto.class)).collect(Collectors.toList());
        return result;
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        ProductDto result = modelMapper.map(product, ProductDto.class);
        return result;
    }

    @Override
    public List<ProductDto> getProductsByCategoryId(Long id) {
        List<Product> products = productRepository.findByCategoryId(id);
        List<ProductDto> result = products.stream().map(product -> modelMapper.map(product,ProductDto.class)).collect(Collectors.toList());
        return result;
    }

    @Override
    public ApiResponse deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product","id", id));
        productRepository.delete(product);
        return new ApiResponse(true, "Product deleted successfully");
    }
}
