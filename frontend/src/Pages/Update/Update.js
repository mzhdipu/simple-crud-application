import React from 'react';
import { json, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Update = () => {
    const storedProduct = useLoaderData()
    const navigate = useNavigate()
    
    const handleSubmitUpdate = (event) =>{
        event.preventDefault()
        const updateProduct = {
            ProductName : event.target.name.value,
            ProductPrice : event.target.price.value
        }
        
        fetch(`http://localhost:5000/update/${storedProduct._id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(updateProduct)
        })
        .then(res => res.json())
        .then(data => {

            if(data.success){
                toast.success(data.message)
                event.target.reset()
                navigate('/')
            }
            else{
                toast.error(data.error)
            }
        })
    } 

    return (
        <div>
            <h1>Update Product : {storedProduct.ProductName}</h1>

            <form onSubmit={handleSubmitUpdate}>
                <input type="text" name="name" defaultValue={storedProduct.ProductName} /> <br />
                <input type="text" name="price" defaultValue={storedProduct.ProductPrice} /> <br />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Update;