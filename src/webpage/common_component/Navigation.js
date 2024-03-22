import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog, faUser, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import '../css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
            isInfoTableVisible: false,
            isKhoHangVisible: false,
        };
    }
    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen,
        }));
        
        if (!this.state.isMenuOpen) {
            document.body.classList.add('menu-hidden');
        } else {
            document.body.classList.remove('menu-hidden');
        }
    };
    

    toggleInfoTable = () => {
        this.setState((prevState) => ({
            isInfoTableVisible: !prevState.isInfoTableVisible,
        }));
    };
    render() {
        return (
            <div className="wrapper"> {/* Thêm div bọc ngoài cùng */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className={`content-left ${this.state.isMenuOpen ? 'collapsed' : ''}`}>
                        <div className="logo-container">
                            <FontAwesomeIcon icon={faBars} onClick={this.toggleMenu} />
                            <div className="logo">
                                <img src={require("../img/logo.jpg")} alt="Logo" height={70} width={180} />
                            </div>
                        </div>
                        <div className="menu">
                            <div className="menu-item">
                                <div> 
                                    <img src={require("../img/iconNhậpHàng.jpg")} alt="Icon" width={60} height={60} />
                                    <a href="#">Đơn Nhập Hàng</a>
                                </div>
                            </div>
                            <div className="menu-item">
                                <div>
                                    <img src={require("../img/iconXuatHang.png")} alt="Icon" width={60} height={60} />
                                    <a href="#">Đơn Xuất Hàng</a>
                                </div>
                            </div>
                            <div className="menu-item">
                                <div> 
                                    <Link to="/Product" className='nav-link' >
                                     
                                        <img src={require("../img/iconKhoHang.png")} alt="Icon" width={60} height={60} />
                                        Kho Hàng
                                    </Link>
                                </div>
                            </div>
                            <div className="menu-item">
                                <div>
                                    <img src={require("../img/iconChuyếnHàng.jpg")} alt="Icon" width={60} height={60} />
                                    <a href="#">Chuyến Hàng</a>
                                </div>
                            </div>
                            <div className="menu-item">
                                <div>
                                    <img src={require("../img/iconDanhMục.jpg")} alt="Icon" width={60} height={60} />
                                    <a href="#">Danh Mục</a>
                                </div>
                            </div>
                        </div>
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
                </nav>
            </div>
        );
    }
}

export default Navigation;
