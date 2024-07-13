import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/requests';
import { useFormik } from 'formik';
import { Grid, TextField } from '@mui/material';
import { useAdminContext } from '../../context/AdminContext';

const AdminLogin = () => {
    const [admin, setAdmin] = useAdminContext();
    console.log('admin', admin);
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const response = await signIn({
            username: values.username,
            password: values.password,
        });
        console.log('API Response:', response);
        if (response.auth) {
            localStorage.setItem('adminToken', response.token);
            localStorage.setItem('admin', JSON.stringify(response.user));
            setAdmin(response.user);
            actions.resetForm();
            navigate('/admin');
        } else {
            // Giriş başarısız olduğunda hata mesajı gösterin
            console.error('Authentication failed');
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: handleSubmit,
    });

    return (
        <Grid container spacing={2} style={{ width: '70%', margin: '100px auto', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
            <Grid item sm={6} xs={12} md={6}>
                <div style={{ backgroundColor: 'rgb(146,67,109)', padding: '150px 0' }}>
                    <article style={{ color: 'white', textAlign: 'center' }}>
                        <h3>Welcome to Admin Login Page</h3>
                        <p>Log in and change some things.</p>
                    </article>
                </div>
            </Grid>
            <Grid item sm={6} xs={12} md={6}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <article>
                            <h3>Sign In</h3>
                        </article>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                style={{ width: '80%' }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="username"
                                value={formik.values.username}
                                type="text"
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                style={{ width: '80%' }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="password"
                                value={formik.values.password}
                                type="password"
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                            />
                            <br />
                            <button type="submit" style={{ backgroundColor: 'rgb(146,67,109)', border: 'none', padding: '6px 30px', color: 'white', width: '80%' }}>
                                SIGN IN
                            </button>
                        </div>
                    </div>
                </form>
            </Grid>
        </Grid>
    );
};

export default AdminLogin;
