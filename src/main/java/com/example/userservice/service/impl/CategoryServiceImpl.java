package com.example.userservice.service.impl;

import com.example.userservice.dtos.category.CategoryCreateDto;
import com.example.userservice.dtos.category.CategoryDto;
import com.example.userservice.dtos.category.CategoryUpdateDto;
import com.example.userservice.entity.Category;
import com.example.userservice.entity.Product;
import com.example.userservice.exceptions.ResourceNotFoundException;
import com.example.userservice.payloads.ApiResponse;
import com.example.userservice.repository.CategoryRepository;
import com.example.userservice.repository.ProductRepository;
import com.example.userservice.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ApiResponse create(CategoryCreateDto categoryCreate) {
       Category category = modelMapper.map(categoryCreate, Category.class);
       categoryRepository.save(category);
        return new ApiResponse(true,"Category created successfully!");
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> result = categories.stream().map(category -> modelMapper.map(category, CategoryDto.class)).collect(Collectors.toList());
        return result;
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        CategoryDto result = modelMapper.map(category, CategoryDto.class);
        return result;
    }

    @Override
    public ApiResponse updateCategory(CategoryUpdateDto categoryUpdate, Long id) {
        Category findCategory = categoryRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Category","id", id));
        findCategory.setName(categoryUpdate.getName());
        Category updatedCategory =  categoryRepository.saveAndFlush(findCategory);
        return new ApiResponse(true,"Category updated successfully!",updatedCategory);
    }

    @Override

    public ApiResponse deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        List<Product> products = productRepository.findByCategoryId(id);
        for (Product product : products) {
            product.setCategory(null);
            productRepository.save(product);
        }

        categoryRepository.delete(category);

        return new ApiResponse(true, "Category deleted successfully!");
    }

}
