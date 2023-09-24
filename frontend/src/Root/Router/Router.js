import { createBrowserRouter } from "react-router-dom";
import AllProducts from "../../Pages/AllProducts/AllProducts";
import AddProducts from "../../Pages/AddProducts/AddProducts";
import Update from "../../Pages/Update/Update";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AllProducts></AllProducts>
    },
    {
        path: '/addproduct',
        element: <AddProducts></AddProducts>
    },
    {
        path: '/update/:id',
        element: <Update></Update>,
        loader : ({params})=>{
            return fetch(`http://localhost:5000/update/${params.id}`) 
        }
    }
])