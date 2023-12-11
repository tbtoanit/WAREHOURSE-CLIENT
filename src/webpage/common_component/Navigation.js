import React, { Component } from 'react';
import '../css/bootstrap.min.css'
import { Link } from "react-router-dom"

class Navigation extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        Your Logo
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">
                                    Home <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/product" className="nav-link">
                                    Product
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/newproduct" className="nav-link">
                                    New Product
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        );
    }
}

export default Navigation;