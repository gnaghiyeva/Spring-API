import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postCategory } from '../../../api/requests'
import { useFormik } from 'formik'
import { Alert, Button, TextField } from '@mui/material'
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
const AddCategory = () => {
    const navigate = useNavigate()
    const handleSubmit = async (values, actions) => {
        await postCategory(values)
        actions.resetForm()
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