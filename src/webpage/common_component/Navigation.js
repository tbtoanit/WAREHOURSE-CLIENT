import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog, faUser, faLightbulb, faRocket } from '@fortawesome/free-solid-svg-icons';
import '../css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            isInfoTableVisible: false,
          
        };
    }

    toggleInfoTable = () => {
        this.setState(prevState => ({
            isInfoTableVisible: !prevState.isInfoTableVisible,
        }));
    };

    render() {
        return (
            <div className="main-container d-flex">
                <div className={`sidebar bg-info ${this.state.isMenuOpen ? 'active' : ''}`} id="side_nav">
                  
                    <div className="header-box d-flex justify-content-center mt-3">
                        <img src={require("../img/logo1.jpg")} alt="My Image" className="img-fluid img-thumbnail rounded" style={{ width: '180px', height: '70px' }} />
                        <button className="btn text-white d-md-none btn-close" onClick={this.toggleMenu}>
                            <FontAwesomeIcon icon={faBars} aria-hidden="true" />
                        </button>
                    </div>
                    <hr />
                    <ul className="list-unstyled px-2">
                        <li className="active">
                            <Link className="text-decoration-none px-3 py-2 my-3 d-block" to="#">
                                <FontAwesomeIcon icon={faRocket} />
                                Đơn nhập hàng
                            </Link>
                        </li>
                        <li className="active">
                            <Link className="text-decoration-none px-3 py-2 my-3 d-block" to="#">
                                <FontAwesomeIcon icon={faRocket} />
                                Kho Hàng
                            </Link>
                        </li>
                        <li className="active">
                            <Link className="text-decoration-none px-3 py-2 my-3 d-block" to="#">
                                <FontAwesomeIcon icon={faRocket} />
                                Chuyến Hàng
                            </Link>
                        </li>
                        <li className="active">
                            <Link className="text-decoration-none px-3 py-2 my-3 d-block" to="#">
                                <FontAwesomeIcon icon={faRocket} />
                                Đơn  Xuất Hàng
                            </Link>
                        </li>
                        <li className="active">
                            <Link className="text-decoration-none px-3 py-2 my-3 d-block" to="/category">
                                <FontAwesomeIcon icon={faRocket} />
                                Danh Mục
                            </Link>
                        </li>
                    </ul>
                    <div className="gear-icon-container" onClick={this.toggleInfoTable}>
                        <FontAwesomeIcon icon={faCog} className="fas fa-thin fa-gear fa-2xl" />
                    </div>
                    <div className={`info-table ${this.state.isInfoTableVisible ? 'visible' : ''}`} id="infoTable">
                        <p>
                            <FontAwesomeIcon icon={faUser} size="sm" /> Thông tin đăng nhập
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faLightbulb} size="xs" /> Ngôn ngữ
                        </p>
                        <hr />
                        <p>
                            <a href="#">Đăng Nhập</a>
                        </p>
                        <p>
                            <a href="#">Đăng Xuất</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
