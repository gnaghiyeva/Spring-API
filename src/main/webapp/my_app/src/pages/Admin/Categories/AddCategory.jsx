import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postCategory } from '../../../api/requests'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import Swal from "sweetalert2";

const AddCategory = () => {
    const navigate = useNavigate()
    const handleSubmit = async (values, actions) => {
        await postCategory(values)
        actions.resetForm()

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Category added successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        navigate('/admin/categories')
    }

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: handleSubmit
    })

    return (
        <>

            <h1 style={{textAlign: 'center', fontFamily: 'Lobster' }}>Add Category</h1>

            <form onSubmit={formik.handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '30%', margin: '0 auto' }}>
                    <TextField placeholder='name' onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" />
                    <br />

                </div> <br />
                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto' }} type='submit' variant="contained" disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add</Button>
            </form>
        </>
    )
}

export default AddCategory