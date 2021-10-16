import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import Menu from '../core/Menu';
import Footer from '../core/Footer';

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, name: "", email: "", password: "", error: "", success: true });
            }
        })
    };

    const signUpForm = () => (
        <form className="welcome">
            <div className="form-group">
                <label className="text">Name</label>
                <input onChange={handleChange("name")} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text">Email</label>
                <input onChange={handleChange("email")} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text">Password</label>
                <input onChange={handleChange("password")} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-dark">Sign Up</button>
            {showError()}
            {showSuccess()}
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{marginLeft: '25%', marginRight: '25%',textAlign: 'center', width: '50%',display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess= () => (
        <div className="alert alert-info" style={{marginLeft: '25%', marginRight: '25%',textAlign: 'center', width: '50%', display: success ? '' : 'none'}}>
            New account is created. Please <Link style={{color: 'black'}} to="/signin">Sign In</Link>
        </div>
    );

    return (
        <>
            <Menu />
            {signUpForm()}
            <Footer />
        </> 
    );
};

export default Signup;