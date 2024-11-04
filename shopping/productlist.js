import { useState, useEffect } from "react";

const MyProduct = () =>{

    let[allproduct, setProduct] = useState( [] );
    let[ordericon, setIcon] = useState("fa fa-arrow-up");
    let[order, setOrder] = useState("asc");

    const getProduct = () =>{
        fetch("http://localhost:1234/productapi")
        .then(response =>response.json())
        .then(proArray =>{
        
            if(order=="asc"){
                proArray.sort((a, b) => a.pprice - b.pprice);
                setProduct(proArray);
                setOrder("desc");
                setIcon("fa fa-arrow-up");
            }else{
                proArray.sort((a, b) => b.pprice - a.pprice);
                setProduct(proArray);
                setOrder("asc");
                setIcon("fa fa-arrow-down")
            }
        })
    }
    useEffect(()=>{
        getProduct();
    }, []);

    let[keyword, setKeyword] = useState("");

    return(
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-lg-9">
                    <h3 className="text-center text-info"> {allproduct.length} : Product in Inventory </h3>
                </div>
                <div className="col-lg-3">
                    <input type="text" 
                        className="form-control" 
                        placeholder="Search..."
                        onChange={obj=>setKeyword(obj.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 text-center">
                   <table className="table table-bordered shadow-lg text-start">
                        <thead>
                            <tr className="table-info">
                                <th>#ID</th>
                                <th>Product Name</th>
                                <th className="bg-warning mypointer" onClick={getProduct}><i className={ordericon}></i> Product Price</th>
                                <th>Product Details</th>
                                <th>Photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.map((product, index)=>{
                                if( product.pname.toLowerCase().match(keyword.toLowerCase()) || product.pprice.toString().match(keyword) )
                                    return(
                                        <tr key={index}>
                                            <td> {product.id} </td>
                                            <td> {product.pname} </td>
                                            <td> Rs.{product.pprice} </td>
                                            <td> {product.pdetails} </td>
                                            <td> <img src={product.photo} height="50" width="70"/> </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm"> <i className="fa fa-trash"></i> </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                   </table>
                </div>
            </div>
        </div>
    )
}

export default MyProduct;