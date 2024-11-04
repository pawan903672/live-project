import { useState, useEffect } from "react";

const MyCart = () =>{
    let[allproduct, setProduct] = useState( [] );
    
    const getProduct = () =>{
        fetch("http://localhost:1234/cartapi")
        .then(response =>response.json())
        .then(proArray =>{
           setProduct(proArray); 
        })
    }

    useEffect(()=>{
        getProduct();
    }, []);

    const delPro = (pid)=>{
        let url = "http://localhost:1234/cartapi/"+pid;
        let postdata = {method:"delete"};
        fetch(url, postdata)
        .then(response=>response.json())
        .then(pinfo =>{
            alert(pinfo.pname + " Deleted Successfully !");
            getProduct(); // reload the list after delete
        })
    }
    let totalcost = 0;

    const updateQty = (product, action) =>{
        if(action==="Y"){
            product["qty"] = product.qty + 1;
        }else{
            product["qty"] = product.qty - 1;
        }

        if(product.qty <=0 ){
            delPro(product.id);
        }

        let url = "http://localhost:1234/cartapi/"+product.id;
        let postdata = {
            headers:{'Content-Type':'application/json'},
            method:"put",
            body:JSON.stringify(product)
        }

        fetch(url, postdata)
        .then(response =>response.json())
        .then(info=>{
            getProduct(); // reload the cart item list after update qty
        })
    }

    let[customer, setCustomer] = useState( {} );
    const pickValue = (obj) =>{
        customer[obj.target.name] = obj.target.value;
        setCustomer(customer);
        console.log( customer );
    }


    const save = () =>{
        customer["myproduct"] = allproduct;
        const date = new Date();
        customer["orderdate"] = date.toLocaleString();

        let url = "http://localhost:1234/orderapi";
        let postdata = {
            headers:{'Content-Type':'application/json'},
            method:"post",
            body:JSON.stringify(customer)
        }

        fetch(url, postdata)
        .then(response =>response.json())
        .then(info=>{
           alert("Hi, "+ customer.cname + " \n We have Received Your Order...")
        })
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4">
                    <div className="p-3 shadow">
                        <h3 className="mb-3"> Customer Details </h3>
                        <div className="mb-4">
                            <label> Customer Name </label>
                            <input type="text" className="form-control" name="cname" onChange={pickValue}/>
                        </div>
                        <div className="mb-4">
                            <label> Mobile No </label>
                            <input type="number" className="form-control" name="mobile" onChange={pickValue}/>
                        </div>
                        <div className="mb-4">
                            <label> e-Mail Id </label>
                            <input type="email" className="form-control" name="email" onChange={pickValue}/>
                        </div>
                        <div className="mb-4">
                            <label> Delivery Address </label>
                            <textarea className="form-control" name="address" onChange={pickValue}></textarea>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={save}> Place Order </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <h3 className="text-center tb-4"> {allproduct.length} - item in My Cart </h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Photo</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                allproduct.map((product, index)=>{
                                    totalcost = totalcost + (product.pprice * product.qty);
                                    return(
                                        <tr key={index}>
                                            <td> {product.pname} </td>
                                            <td> <img src={product.photo} height='30' width='40'/> </td>
                                            <td> {product.pprice} </td>
                                            <td>
                                                <button className="btn btn-warning btn-sm me-2" onClick={obj=>updateQty(product, 'N')}> - </button> 
                                                {product.qty} 
                                                <button className="btn btn-info btn-sm ms-2" onClick={obj=>updateQty(product, 'Y')}> + </button> 
                                            </td>
                                            <td> {product.pprice * product.qty} </td>
                                            <td> 
                                                <button 
                                                onClick={obj=>delPro(product.id) }
                                                className="btn btn-danger btn-sm"> 
                                                <i className="fa fa-trash"></i> </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan={5} className="text-end pe-5 text-primary">
                                    <b> Final Cost Rs. {totalcost}   </b>
                                </td>
                                <td> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyCart;