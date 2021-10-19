import React, { useState, useEffect } from 'react';
import { read, listRelated } from './apiCore';
import Card from './Card';
import Menu from './Menu';
import Footer from './Footer';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <>
            <Menu />
            <div className="welcome row">
                <div className="col-8 mb-5">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related products:</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Product;