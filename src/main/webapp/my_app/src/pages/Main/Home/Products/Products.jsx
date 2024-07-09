import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../../api/requests';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import productStyle from '../../../../style/product.module.css';

const Products = () => {
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
        <section className={productStyle.product_container}>
            <article>
                <h1 className={productStyle.product_title}>Products</h1>
            </article>

            <Grid container spacing={2} style={{ padding: '50px 40px' }}>
                {products && products.map((product) => {
                    return (
                        <Grid item sm={6} xs={12} md={3} key={product.id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={getPhotoUrl(product.photoUrl)}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.category.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        {product.price} man
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </section>
    );
};

export default Products;
