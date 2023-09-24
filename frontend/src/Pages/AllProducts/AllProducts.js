import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
    const [allProductsData, setAllProductsData] = useState([])
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        fetch(`http://localhost:5000/products`)
        .then(res => res.json())
        .then(data => setAllProductsData(data.data))
    },[refresh])

    const handleDelete = (allProductData) =>{
        fetch(`http://localhost:5000/products/${allProductData._id}`, {
            method : "DELETE",
        })
        .then(res => res.json())
        .then(data => {
            
            if(data.success){
                toast.success(data.message)
                setRefresh(!refresh);
            }
            else{
                toast.error(data.message)
            }

        })
    }

    const navigate = useNavigate()
    const handleUpdate = (allProductData) =>{
        navigate(`/update/${allProductData._id}`)
    }

    return (
        <div>
            <h2>Total Number of Products : {allProductsData.length}</h2>

            {
                allProductsData.map(allProductData => {
                    return <p key={allProductData._id}>
                        {allProductData.ProductName} : {allProductData.ProductPrice} &nbsp; &nbsp;
                        <button onClick={()=>handleDelete(allProductData)}>X</button> &nbsp;
                        <button onClick={()=>handleUpdate(allProductData)}>Edit</button>
                    </p>
                })
            }

            <Link to='/addproduct'><button>Add new Product</button></Link>
        </div>
    );
};

export default AllProducts;