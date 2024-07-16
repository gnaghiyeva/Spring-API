import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postProduct, getAllCategories } from '../../../api/requests';
import Swal from 'sweetalert2';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';

const AddProduct = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const buttonRef = useRef();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesData = await getAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Handle error (show alert, log, etc.)
            }
        };

        getCategories();
    }, []);



    const handleSubmit = async (values, actions) => {
        const formData = new FormData();
        formData.append('photoFile', selectedImage);

        // Append other form fields
        formData.append('name', values.name);
        formData.append('categoryId', values.categoryName);
        formData.append('price', values.price);

        try {
            const response = await postProduct(formData);
            console.log('API Response:', response);

            Swal.fire({
                icon: 'success',
                title: 'Product added successfully',
                showConfirmButton: false,
                timer: 1500,
            });

            buttonRef.current.style.background = '#1976D2';
            buttonRef.current.textContent = 'Upload File';

            setSelectedImage(null);
            actions.resetForm();
            navigate('/admin/products');
        } catch (error) {
            console.error('API Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            categoryName: '',
            price: '',
        },
        onSubmit: handleSubmit,
    });

    return (
        <>
            <h1 style={{ textAlign: 'center', fontFamily: 'Lobster' }}>Add Product</h1>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                    <TextField
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='name'
                        value={formik.values.name}
                        id='outlined-basic'
                        label='Name'
                        variant='outlined'
                    />
                    <br />
                    <FormControl variant='outlined'>
                        <InputLabel id='category-select-label'>Category</InputLabel>
                        <Select
                            labelId='category-select-label'
                            id='category-select'
                            name='categoryName'
                            value={formik.values.categoryName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label='Category'
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <TextField
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='price'
                        value={formik.values.price}
                        id='outlined-basic'
                        label='Price'
                        variant='outlined'
                    />
                    <br />
                </div>
                <br />
                <Button
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto' }}
                    ref={buttonRef}
                    variant='contained'
                    component='label'
                >
                    Upload File
                    <input
                        onChange={(e) => {
                            buttonRef.current.style.background = 'red';
                            buttonRef.current.textContent = e.target.files[0].name;
                            setSelectedImage(e.target.files[0]);
                        }}
                        onBlur={formik.handleBlur}
                        name='photoFile'
                        type='file'
                        accept='image/*'
                        hidden
                    />
                </Button>
                <br />
                <Button
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }}
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Add
                </Button>
            </form>
        </>
    );
};

export default AddProduct;
