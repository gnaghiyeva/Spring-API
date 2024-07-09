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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
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

        MultipartFile file = productCreate.getPhotoFile();
        if (file != null && !file.isEmpty()) {

            // UUID
            String fileName = UUID.randomUUID().toString() + getFileExtension(file.getOriginalFilename());
            Path filePath = Paths.get("src/main/resources/static/uploads/" + fileName);
            System.out.println("Saving file to path: " + filePath.toAbsolutePath());
            try {
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());
                product.setPhotoUrl(fileName);
                System.out.println("File saved successfully to path: " + filePath.toAbsolutePath());
            } catch (IOException e) {
                System.out.println("Error saving file: " + e.getMessage());
                return new ApiResponse(false, "Error saving file");
            }
        }

        productRepository.save(product);
        return new ApiResponse(true, "Product created successfully!");
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex);
    }

    @Override
    public ApiResponse updateProduct(ProductUpdateDto productUpdate, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        // Sadece name güncelle
        if (productUpdate.getName() != null) {
            product.setName(productUpdate.getName());
        }

        // Sadece price güncelle
        if (productUpdate.getPrice() != 0) {
            product.setPrice(productUpdate.getPrice());
        }

        // Category güncelle
        if (productUpdate.getCategoryId() != null) {
            CategoryDto category = categoryService.getCategoryById(productUpdate.getCategoryId());
            Category mapCategory = modelMapper.map(category, Category.class);
            product.setCategory(mapCategory);
        }

        // Photo güncelle
        MultipartFile file = productUpdate.getPhotoFile();
        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + getFileExtension(file.getOriginalFilename());
            Path filePath = Paths.get("src/main/resources/static/uploads/" + fileName);
            System.out.println("Saving file to path: " + filePath.toAbsolutePath());
            try {
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());
                System.out.println("File saved successfully to path: " + filePath.toAbsolutePath());

                // Evvelki photo sil
                if (product.getPhotoUrl() != null && !product.getPhotoUrl().isEmpty()) {
                    Path oldFilePath = Paths.get("src/main/resources/static/uploads/" + product.getPhotoUrl());
                    boolean isDeleted = Files.deleteIfExists(oldFilePath);
                    if (isDeleted) {
                        System.out.println(("Old file deleted successfully from path: " + oldFilePath.toAbsolutePath()));
                    } else {
                        System.out.println("Could not delete old file: " + oldFilePath.toAbsolutePath());
                    }
                }

                // Yeni photo
                product.setPhotoUrl(fileName);
            } catch (IOException e) {
                System.out.println("Error saving file: " + e.getMessage());
                return new ApiResponse(false, "Error saving file");
            }
        }

        productRepository.save(product);
        return new ApiResponse(true, "Product updated successfully!");
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
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        // Fotoğraf dosyasını sil
        if (product.getPhotoUrl() != null && !product.getPhotoUrl().isEmpty()) {
            Path filePath = Paths.get("src/main/resources/static/uploads/" + product.getPhotoUrl());
            try {
                boolean isDeleted = Files.deleteIfExists(filePath);
                if (isDeleted) {
                    System.out.println("Photo deleted successfully from path: " + filePath.toAbsolutePath());
                } else {
                    System.out.println("Could not delete photo: " + filePath.toAbsolutePath());
                }
            } catch (IOException e) {
                System.out.println("Error deleting photo: " + e.getMessage());
                return new ApiResponse(false, "Error deleting photo");
            }
        }

        // Ürünü veritabanından sil
        productRepository.delete(product);
        return new ApiResponse(true, "Product deleted successfully");
    }

}
