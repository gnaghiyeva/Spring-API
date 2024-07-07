import { BASE_URL } from "./base_url";
import axios from 'axios'

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