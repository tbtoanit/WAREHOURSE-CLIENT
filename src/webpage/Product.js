import React, { useState, useEffect } from 'react';
import style from './css/product.css';
import Navigation from './common_component/Navigation';
import Footer from './common_component/Footer';
import axios from "axios";

function Product() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:8080/api/prod/getAllProducts"
            );
            setPosts(response.data);
            setLoading(false);
        };

        loadPost();
    }, []);

    const handleCreateNew = () => {
        setShowForm(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const productData = {
            prod_name: formData.get('product-name'),
            prod_id: formData.get('product-code'),
            prod_cate_id: formData.get('category'),
            prod_weight: formData.get('weight'),
            prod_weight_unit: formData.get('weight-unit')
        };

        try {
            await axios.post("http://localhost:8080/api/prod/saveProd", productData);
            const response = await axios.get("http://localhost:8080/api/prod/getAllProducts");
            setPosts(response.data);
            setShowForm(false);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    return (
        <div>
            <Navigation />
            <div className="full-height">
                <div className="full-height flex-container flex-column align-center">
                    <div className="header-container">
                        <div className="header">
                            Kho hàng
                        </div>
                        <button className="new-button" onClick={handleCreateNew}>Tạo mới</button>
                    </div>
                    <div className="divider"></div>
                    {showForm && (
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="product-name">Tên sản phẩm:</label>
                                    <input type="text" id="product-name" name="product-name" placeholder="Nhập tên sản phẩm..." />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product-code">Mã sản phẩm:</label>
                                    <input type="text" id="product-code" name="product-code" placeholder="Nhập mã sản phẩm..." />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Danh mục:</label>
                                    <input type="text" id="category" name="category" placeholder="Nhập mã sản phẩm..." />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="weight">Khối lượng sản phẩm:</label>
                                    <input type="text" id="weight" name="weight" placeholder="Nhập khối lượng sản phẩm..." />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="weight-unit">Đơn vị:</label>
                                    <input type="text" id="weight-unit" name="weight-unit" placeholder="Nhập đơn vị..." />
                                </div>
                            </div>
                            <button type="submit">Lưu</button>
                        </form>
                    )}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="product-name">Tên sản phẩm:</label>
                            <input type="text" id="product-name" placeholder="Nhập tên sản phẩm..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="product-code">Mã sản phẩm:</label>
                            <input type="text" id="product-code" placeholder="Nhập mã sản phẩm..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Danh mục:</label>
                            <select id="category">
                                <option value="category1">Danh mục 1</option>
                                <option value="category2">Danh mục 2</option>
                                <option value="category3">Danh mục 3</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Thời gian:</label>
                            <input type="date" id="date" />
                        </div>
                    </div>
                    <div className="container">
                        <div className="column">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mã sản phẩm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((warehousemgt, index) => (
                                        <tr key={index}>
                                            <td>{warehousemgt.prod_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="column">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((warehousemgt, index) => (
                                        <tr key={index}>
                                            <td>{warehousemgt.prod_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="column">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Danh mục</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((warehousemgt, index) => (
                                        <tr key={index}>
                                            <td>{warehousemgt.prod_cate_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="column">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Khối lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((warehousemgt, index) => (
                                        <tr key={index}>
                                            <td>{warehousemgt.prod_weight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="column">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Đơn vị</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((warehousemgt, index) => (
                                        <tr key={index}>
                                            <td>{warehousemgt.prod_weight_unit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;
