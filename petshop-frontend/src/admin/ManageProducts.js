
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import Menu from "../core/Menu";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <Menu />
            <div className="welcome row">
                <div className="col-12">
                    <h2 className="text-center">
                        TOTAL PRODUCTS: {products.length}
                    </h2>
                    <hr style={{backgroundColor: '#fff'}} />
                    <div class="container">
                        {products.map((p, i) => (
                            <div key={i} class="row" style={{textAlign: 'center'}}>
                                <div class="col-sm">
                                    <label>{p.name}</label>
                                </div>
                                <div class="col-sm">
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <label className="badge badge-info size">
                                            Update
                                        </label>
                                    </Link>
                                </div>
                                <div class="col-sm">
                                <label onClick={() => destroy(p._id)} className="badge badge-danger size">
                                    Delete
                                </label>
                            </div>
                        </div>
                        ))} 
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageProducts;