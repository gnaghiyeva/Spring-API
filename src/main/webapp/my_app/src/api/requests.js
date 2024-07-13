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

//
// export const getProductById = async(id)=>{
//     let globalData;
//     await axios.get(`${BASE_URL}/product/${id}`).then((res)=>{
//         globalData=res.data
//     })
//     return globalData
// }
//
// export const deleteProduct = async(id)=>{
//     let deletedService
//     await axios.delete(`${BASE_URL}/product/${id}`).then((res)=>{
//         deletedService=res.data
//     })
//     return deletedService
// }
//
// export const editProduct= (id,updatedProduct)=>{
//     axios.put(`${BASE_URL}/product/${id}`,updatedProduct)
// }
//
// export const postProduct = (newProduct)=>{
//     axios.post(`${BASE_URL}/product`,newProduct)
// }