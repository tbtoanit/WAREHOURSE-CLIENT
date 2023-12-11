import React, { Component } from 'react';
import Navigation from './common_component/Navigation';
import Footer from './common_component/Footer';

class Home extends Component {
    render() {
        return (

            <div>
                <Navigation />
                <p>Welcome to home</p>
                <Footer />
            </div>
        );
    }
}

export default Home;