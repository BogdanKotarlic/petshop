import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';
import Footer from '../core/Footer';
import Menu from '../core/Menu';

const Signin = () => {
    const [values, setValues] = useState({
        email: "petar@gmail.com",
        password: "perica123",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false});
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, redirectToReferrer: true });
                    })
                }
            });
    };

    const signUpForm = () => (
        <form className="welcome">
            <div className="form-group">
                <label className="text">Email</label>
                <input onChange={handleChange("email")} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text">Password</label>
                <input onChange={handleChange("password")} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-dark">Log In</button>
            {showError()}
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{marginLeft: '25%', marginRight: '25%',textAlign: 'center', width: '50%',display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <>
            <Menu />
            {signUpForm()}
            {redirectUser()}
            <Footer />
        </>
    );
};

export default Signin;