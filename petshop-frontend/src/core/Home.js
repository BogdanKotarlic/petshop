import React, { Fragment } from 'react';
import Menu from './Menu';
import Footer from './Footer';

const Home = () => {

    const coloredLine = () => (
        <hr style={{color: '#white', backgroundColor: 'white', height: 1, width: '75%', marginBottom: '3rem'}} />
    );

    const homeScreen = () => {
        return (
            <Fragment>
                <div className="container-fluid padding">
                    <div className="row welcome text-center">
                        <div className="col-12">
                            <h1 className="display-4">WELCOME TO PET SHOP</h1>
                        </div>
                        <div className="col-12">
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                </div>
                {coloredLine()}
                <div className="container-fluid padding">
                    <div className="row text-center padding">
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <img src="/images/toys.png" alt="toys" style={{width: '45px', height: '45px', marginTop: '2rem', marginBottom: '1rem'}} />
                            <h3>TOYS</h3>
                            <p>You can buy toy for your pet on this online shop</p>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <img src="/images/dog-food.png" alt="toys" style={{width: '45px', height: '45px', marginTop: '2rem', marginBottom: '1rem'}} />
                            <h3>FOOD</h3>
                            <p>You can buy food for your pet on this online shop</p>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <img src="/images/brush.png" alt="toys" style={{width: '45px', height: '45px', marginTop: '2rem', marginBottom: '1rem'}} />
                            <h3>HYGIENE</h3>
                            <p>You can buy everything for hygiene on this online shop</p>
                        </div>
                    </div>
                </div>
                
            </Fragment>
        );
    };

    return (
        <Fragment>
            <Menu />
            {homeScreen()}
            <Footer />
        </Fragment>
    );
};

export default Home;