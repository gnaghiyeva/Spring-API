import React, { useEffect, useState } from 'react';
import {deleteProduct, getAllProducts} from '../../../api/requests';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Swal from "sweetalert2";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {Link} from "react-router-dom";
const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res);
            console.log(res);
        });
    }, []);

    const getPhotoUrl = (photoUrl) => {
        return `http://localhost:8080/uploads/${photoUrl}`;
    };

    return (
        <>
            <div style={{textAlign:'center',fontSize:'1.5em'}}>
                Add Product<a href='/admin/add-product'><LibraryAddIcon/></a>
            </div>
            <TableContainer component={Paper} style={{width: '60%', margin: '30px auto'}}>

                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Edit</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="center">
                                    <img style={{width: '10%'}} src={getPhotoUrl(product.photoUrl)} alt='priceImage'/>
                                </TableCell>
                                <TableCell align="center">{product.name}</TableCell>
                                <TableCell align="center">{product.category.name}</TableCell>

                                <TableCell align="center"><DeleteIcon style={{color: 'red', fontSize: '33px'}}
                                                                      onClick={() => {
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
                                                                                  deleteProduct(product.id).then((res) => {
                                                                                      Swal.fire(
                                                                                          'Deleted!',
                                                                                          'Your file has been deleted.',
                                                                                          'success'
                                                                                      )

                                                                                  })
                                                                                  setProducts(products.filter((x) => x.id !== product.id))
                                                                              }
                                                                          })
                                                                      }}/></TableCell>
                                <TableCell align="center"><ModeEditIcon style={{fontSize: '33px'}}/></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AdminProducts;
