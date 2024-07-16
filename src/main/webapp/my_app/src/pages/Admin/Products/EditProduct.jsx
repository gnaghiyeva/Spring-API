import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from '../../../context/ProductContext';
import { editProduct, getAllCategories, getProductById } from "../../../api/requests";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";

const EditProduct = () => {
    const buttonRef = useRef();
    const [products, setProducts] = useProductContext();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProductById(id).then((res) => {
            setProduct(res);
            formik.setValues({
                photoFile: res.photoFile,
                name: res.name,
                price: res.price,
                categoryName: res.categoryName,
            });
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching product:', error);
        });
    }, [id]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleEdit = async (values, actions) => {
        const formData = new FormData();
        if (values.photoFile !== product.photoFile) {
            formData.append('photoFile', values.photoFile);
        }
        if (values.name !== product.name) {
            formData.append('name', values.name);
        }
        if (values.price !== product.price) {
            formData.append('price', values.price);
        }
        if (values.categoryName !== product.categoryName) {
            formData.append('categoryName', values.categoryName);
        }

        // Log FormData contents
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            await editProduct(id, formData);
            const updatedProducts = products.map((item) => {
                if (item.id === id) {
                    return { ...item, ...values };
                }
                return item;
            });

            setProducts(updatedProducts);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Product edited successfully`,
                showConfirmButton: false,
                timer: 1500,
            });

            navigate('/admin/products');
            actions.resetForm();
        } catch (error) {
            console.error('Error editing product:', error);
            // Handle the error (show alert, log, etc.)
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            categoryName: '',
            photoFile: null,
        },
        onSubmit: handleEdit,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue('photoFile', file);
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center', fontFamily: 'Lobster' }}>Editing Product</h1>
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress color="secondary" />
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            style={{ width: '300px' }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='name'
                            type='text'
                            value={formik.values.name}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                        />
                        <br />

                        <FormControl variant='outlined' style={{ width: '200px' }}>
                            <InputLabel id='category-select-label'>Category</InputLabel>
                            <Select
                                labelId='category-select-label'
                                id='category-select'
                                name='categoryName'
                                value={formik.values.categoryName || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label='Category'
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.name}>
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

                        <Button ref={buttonRef} variant="contained" component="label">
                            Edit File
                            <input
                                onChange={handleImageChange}
                                onBlur={formik.handleBlur}
                                name="photoFile"
                                type="file"
                                accept="image/*"
                                hidden
                            />
                        </Button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button type='submit' variant='contained' color='success'>Edit</Button>
                    </div>
                </form>
            )}
        </>
    );
}

export default EditProduct;
