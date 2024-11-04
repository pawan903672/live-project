import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const MyDashboard = () =>{

    let[allproduct, setProduct] = useState( [] );
    let[allorder, setOrder] = useState( [] );

    const getProduct = () =>{
        fetch("http://localhost:1234/productapi")
        .then(response =>response.json())
        .then(proArray =>{
            setProduct(proArray);
        })
    }

    const getOrder = () =>{
        fetch("http://localhost:1234/orderapi")
        .then(response =>response.json())
        .then(proArray =>{
            setOrder(proArray);
        })
    }

    useEffect(()=>{
        getProduct();
        getOrder();
    }, []);

    return(
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-lg-12">
                    <h1 className="text-center"> Seller Dashboard </h1>
                </div>
            </div>

            <div className="row text-center">
                <div className="col-lg-4 text-primary">
                    <Link to="/inventory" className="text-decoration-none">
                        <i className="fa fa-suitcase fa-4x"></i>
                        <h4> Total Product ( { allproduct.length } ) </h4>
                    </Link>
                </div>

                <div className="col-lg-4">
                    <Link to="/order" className="text-decoration-none text-warning">
                        <i className="fa fa-headset fa-4x"></i>
                        <h4> Order Received ( {allorder.length} ) </h4>
                    </Link>
                </div>

                <div className="col-lg-4">
                    <Link to="/new-inventory" className="text-decoration-none text-success">
                        <i className="fa fa-plus fa-4x"></i>
                        <h4> Add Product </h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MyDashboard;