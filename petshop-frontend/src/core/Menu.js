import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#f5dcb4" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => {
    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">
					<img src="/images/logo.png" alt="logo" style={{width: '50px', height: '50px'}} />
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarResponsive">
					<ul class="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/cart')} to="/cart">Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
                </li>
                
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>
                )}
                
                { !isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </Fragment>
                )}

                { isAuthenticated() && (
                    <li className="nav-item">
                        <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signout(() => {
                            history.push('/')
                        })}>Signout</span>
                    </li>
                )}
					</ul>
				</div>
			</div>
		</nav>
    );
};

export default withRouter(Menu);