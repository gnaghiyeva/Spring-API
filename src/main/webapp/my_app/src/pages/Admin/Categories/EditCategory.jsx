import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryContext } from '../../../context/CategoryContext';
import { editCategory, getCategoryById } from '../../../api/requests';

import { useFormik } from 'formik';
import { Button, CircularProgress, TextField } from '@mui/material';

import Swal from "sweetalert2";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useCategoryContext();
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategoryById(id).then((res) => {
            setCategory(res);
            formik.setValues({
                name: res.name,
            });
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching category:', error);
            setLoading(false);
        });
    }, [id]);

    const handleEdit = async (values, actions) => {
        const formData = new FormData();
        if (values.name !== category.name) {
            formData.append('name', values.name);
        }

        try {
            await editCategory(id, formData);
            const updatedCategories = categories.map((item) => {
                if (item.id === id) {
                    return { ...item, ...values };
                }
                return item;
            });

            setCategories(updatedCategories);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Category edited successfully`,
                showConfirmButton: false,
                timer: 1500,
            });

            navigate('/admin/categories');
            actions.resetForm();
        } catch (error) {
            console.error('Error editing category:', error);
            // Handle the error (show alert, log, etc.)
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: handleEdit,
    });

    return (
        <>
            <h1 style={{ textAlign: 'center', fontFamily: 'Lobster' }}>Editing Category</h1>
            {loading ? (
                <div style={{ textAlign: 'center', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button type='submit' variant='contained' color='success'>Edit</Button>
                    </div>
                </form>
            )}
        </>
    );
};

export default EditCategory;
