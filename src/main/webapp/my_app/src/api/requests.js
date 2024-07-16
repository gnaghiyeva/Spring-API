import { BASE_URL } from "./base_url";
import axios from 'axios'

export const signIn = async ({ username, password }) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usernameOrEmail: username, password }),
            credentials: 'include', // Gerekiyorsa ekleyin
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Sign-in failed', response);
            return { auth: false };
        }
    } catch (error) {
        console.error('An error occurred during sign-in', error);
        return { auth: false };
    }
};


//products
export const getAllProducts = async()=>{
    let globalData
    await axios.get(`${BASE_URL}/products`)
        .then(res => {
            globalData = res.data;
        })
    return globalData
}


export const postProduct = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error posting product:', error.response?.data || error.message); // Log the error details
        throw error;
    }

};

export const deleteProduct = async(id)=>{
    let deletedService
    await axios.delete(`${BASE_URL}/products/${id}`).then((res)=>{
        deletedService=res.data
    })
    return deletedService
}

export const getProductById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/products/${id}`).then((res)=>{
        globalData=res.data
    })
    return globalData
}

export const editProduct = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${BASE_URL}/products/${id}`, updatedProduct, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error editing product:', error);
        throw error;
    }
};


//categories
export const getAllCategories = async()=>{
    let globalData
    await axios.get(`${BASE_URL}/category`)
        .then(res => {
            globalData = res.data;
        })
    return globalData
}