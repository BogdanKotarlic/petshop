import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Menu from "../core/Menu";

const AdminDashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header name">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link style={{color: 'black'}} className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link style={{color: 'black'}} className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link style={{color: 'black'}} className="nav-link" to="/admin/orders">View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link style={{color: 'black'}} className="nav-link" to="/admin/products">Manage Products</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card" style={{marginTop: '40px'}}>
                <h3 className="card-header name">Admin Information</h3>
                <ul className="list-group" style={{color: 'black'}}>
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Email: {email}</li>
                </ul>
            </div>
        );
    };

    return (
        <>
            <Menu />
            <div className="welcome">
                {adminLinks()}
                {adminInfo()}
            </div>
        </>
    );
};

export default AdminDashboard;