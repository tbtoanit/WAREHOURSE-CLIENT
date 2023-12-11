import React, { Component } from 'react';
import './css/bootstrap.min.css';
import Navigation from './common_component/Navigation';
import Footer from './common_component/Footer';

function Content() {
    return (
        <div className="container mt-4">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Title 1</td>
                        <td>Description 1</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Title 2</td>
                        <td>Description 2</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    )
}

class Product extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Content />
                <Footer />
            </div>
        );
    }
}

export default Product;