import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from './apiAdmin';
import Menu from "../core/Menu";
import { Link } from "react-router-dom";

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { name, description, price, categories, category, shipping, quantity, error, loading, createdProduct, redirectToProfile, formData } = values;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, error: '' });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});

        createProduct(user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values, name: '', description: '', photo: '', price: '', quantity: '', loading: false, createdProduct: data.name
                });
            }
        });
    };

    const goBack = () => (
        <div className="welcome2">
            <Link to="/admin/dashboard" style={{color: '#f5dcb4'}}>Back to Dashboard</Link>
        </div>
    );

    const newPostForm = () => (
        <form className="welcome" onSubmit={clickSubmit}>
            <label className="text">Photo</label>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="text">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label className="text">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>
            {showSuccess()}
            {showError()}
            <button className="btn btn-dark">Create Product</button>
        </form>
    );

    const showError = () => (
        <h3 className="text-danger" style={{display: error ? '' : 'none'}}>{error}</h3>
    );

    const showSuccess = () => (
        <h3 className="text-success" style={{display: createdProduct ? '' : 'none'}}>Product is created</h3>
    );

    return (
        <>
            <Menu />
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                    {goBack()}
                </div>
            </div>
        </>
    );
};

export default AddProduct;