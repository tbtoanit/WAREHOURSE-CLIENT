import React, { Component } from 'react';
import '../css/bootstrap.min.css'

class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-3 bg-light">
                <div className="container">
                    <span className="text-muted">
                        © 2023 Your Company. All rights reserved. | Designed by You
                    </span>
                </div>
            </footer>
        );
    }
}

export default Footer;