import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const MyOrder = () =>{
    let[allorder, setOrder] = useState( [] );

    const getOrder = () =>{
        fetch("http://localhost:1234/orderapi")
        .then(response =>response.json())
        .then(proArray =>{
            setOrder(proArray.reverse());
        })
    }

    useEffect(()=>{
        getOrder();
    }, []);

    return(
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-lg-12">
                    <h1 className="text-center"> Manage Order : { allorder.length } </h1>
                </div>
            </div>

            {
                allorder.map((product, index)=>{
                    return(
                        <div className="row mb-4 shadow p-3" key={index}>
                            <div className="col-lg-3">
                                <b> {product.cname} </b>
                                <p> Mobile No : {product.mobile} </p>
                                <p> e-Mail id : {product.email} </p>
                                <p> Address : {product.address} </p>
                            </div>
                            <div className="col-lg-9">
                                <h5 className="text-center text-danger mb-3"> 
                                    Order id : {product.id} ,  Date - {product.orderdate} 
                                </h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Photo</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            product.myproduct.map((product, index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td> {product.pname} </td>
                                                        <td> <img src={product.photo} height='30' width='40'/> </td>
                                                        <td> {product.pprice} </td>
                                                        <td> {product.qty}  </td>
                                                        <td> {product.pprice * product.qty} </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyOrder;