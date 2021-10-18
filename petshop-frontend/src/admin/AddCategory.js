import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createCategory } from './apiAdmin';
import Menu from "../core/Menu";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        createCategory(user._id, token, { name })
        .then(data => {
            if (data.error) {
                setError(true);
            } else {
                setError('');
                setSuccess(true);
            }
        })
    };

    const newCategoryForm = () => (
        <form className="welcome" onSubmit={ clickSubmit }>
            <div className="form-group">
                <label className="text">Name</label>
                <input type="text" className="form-control" onChange={ handleChange } value={name} autoFocus required />
            </div>
            <button className="btn btn-dark">Create Category</button>
            {showError()}
            {showSuccess()}
            {goBack()}
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Category is created!</h3>;
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique!</h3>;
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" style={{color: '#f5dcb4'}}>Back to Dashboard</Link>
        </div>
    );

    return (
        <>
            <Menu />
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newCategoryForm()}
                </div>
            </div>
        </>
    );
};

export default AddCategory;