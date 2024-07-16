import React, {useEffect, useState} from "react";
import {getAllCategories, deleteCategory} from "../../../api/requests";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import Swal from "sweetalert2";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
const AdminCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then((res) => {
            setCategories(res);
            console.log(res);
        });
    }, []);

    return (

            <>
                <article style={{textAlign: 'center', fontFamily: 'Lobster', marginTop: '40px'}}>
                    <h1>Categories</h1> <a href='/admin/add-category'><LibraryAddIcon/></a>
                </article>
                <Grid container spacing={2} style={{ padding: '0 40px', marginTop:'40px' }}>
                    {categories && categories.map((category) => {
                        return (
                            <Grid item sm={6} xs={12} md={3}>
                                <Card style={{ height: '150px' }}>
                                    <Card.Body>
                                        <Card.Title>{category.name}</Card.Title>

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <button type="button" class="btn btn-outline-danger"  onClick={() => {
                                                Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, delete it!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteCategory(category.id).then((res) => {
                                                            Swal.fire(
                                                                'Deleted!',
                                                                'Your file has been deleted.',
                                                                'success'
                                                            )

                                                        })
                                                        setCategories(categories.filter((x) => x.id !== category.id))
                                                    }
                                                })
                                            }}>Delete</button>
                                            <button type="button" class="btn btn-outline-info"><Link style={{ textDecoration: 'none' }} to={`/admin/category/edit/${category.id}`}>Edit</Link></button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Grid>
                        )
                    })}

                </Grid>

            </>
    )
}
export default AdminCategories