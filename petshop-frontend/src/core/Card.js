import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({ product, showViewProductButton = true, showAddToCartButton=true, cartUpdate=false, showRemoveProductButton=false, setRun = f => f, run = undefined }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button style={{backgroundColor: '#282d32', color: 'white', border: 'none'}} className="mt-2 mb-2 ml-2 mr-2">
                        View Product
                    </button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button style={{backgroundColor: '#282d32', color: 'white', border: 'none'}} onClick={addToCart} className="mt-2 mb-2 ml-2 mr-2">
                    Add to card
                </button>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run);
              }}
              className="mt-2 mb-2 ml-2"
              style={{backgroundColor: 'red', color: 'white', border: 'none'}}
            >
              Remove
            </button>
          )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-dark">In Stock</span>
        ) : (
          <span className="badge badge-dark">Out of Stock</span>
        );
    };

    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && (
            <div style={{width: '100%', marginBottom: '10px'}}>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        )
    };

    return (
            <div className="text-center" style={{border: '1px solid white'}}>
                <div className="name" style={{marginTop: '10px'}}>
                    { product.name }
                </div>
                <div>
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product" />
                    <p>${ product.price }</p>
                    <p>{product.category && product.category.name}</p>
                    {showStock(product.quantity)}
                    <br />
                    {showViewButton(showViewProductButton)}
                    {showAddToCart(showAddToCartButton)}
                    {showRemoveButton(showRemoveProductButton)}
                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
    );
};

export default Card;