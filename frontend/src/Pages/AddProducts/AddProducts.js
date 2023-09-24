import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProducts = () => {
    const handleSubmit = (event) =>{
        event.preventDefault()
        const products = {
            ProductName : event.target.name.value,
            ProductPrice : event.target.price.value,
        }
        fetch(`http://localhost:5000/products`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(products)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)  
            if(data.success){
                toast.success(data.message)
                event.target.reset()
            }
            else{
                toast.error(data.message)
            }
        })
    }
    return (
        <div>
            <h1>Add a New Product</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" /> <br />
                <input type="text" name="price" placeholder="Product Price" /> <br />
                <button type="submit">Add Products</button> <br /><br /><br />

                <Link to='/'><button>All Product</button></Link>
            </form>
        </div>
    );
};

export default AddProducts;