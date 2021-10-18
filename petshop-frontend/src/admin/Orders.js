import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from "moment";
import Menu from "../core/Menu";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        })
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        })
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h2 style={{color: "#f5dcb4", border: '2px solid #f5dcb4', padding: '10px'}}>Total orders: {orders.length}</h2>
            );
        } else {
            return (
                <h2 style={{color: "#f5dcb4"}}>No orders</h2>

            );
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if (data.error) {
                console.log('Status update failed');
            } else {
                loadOrders();
            }
        })
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <>
            <Menu />
            <div className="welcome row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    
                    {orders.map((o, oIndex) => {
                        return (
                            <div className="mt-5" key={oIndex} style={{borderBottom: '3px solid white'}}>
                                <h5 className="mb-5">
                                    <span className="bg-dark">Order ID: {o._id}</span>
                                </h5>

                                <ul className="list-group mb-2" style={{color: 'black'}}>
                                    <li className="list-group-item">{showStatus(o)}</li>
                                    <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                                    <li className="list-group-item">Amount: ${o.amount}</li>
                                    <li className="list-group-item">Ordered by: {o.user.name}</li>
                                    <li className="list-group-item">Ordered on: {moment(o.createdAt).fromNow()}</li>
                                    <li className="list-group-item">Delivery address: {o.address}</li>
                                </ul>

                                <h4 className="mt-4 mb-4 font-italic">Total products in the order: {o.products.length}</h4>

                                {o.products.map((p, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{padding: '20px', border: '1px solid white'}}>
                                        {showInput('Product name', p.name)}
                                        {showInput('Product price', p.price)}
                                        {showInput('Product total', p.count)}
                                        {showInput('Product ID', p._id)}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
};

export default Orders;