import React, { useState, useEffect } from 'react';
import style from './css/product.css';
import Navigation from './common_component/Navigation';
import Footer from './common_component/Footer';
import axios from "axios";

function Product() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchInputId, setSearchInputId] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleEdit = (product) => {
        setEditProduct(product);
        setShowEditForm(true);
    }

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:8081/api/prod//getAllProd"
            );
            setPosts(response.data);
            setLoading(false);
        };

        loadPost();
    }, [refreshData]);

    const handleCreateNew = () => {
        setShowCreateForm(true);
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = { // Thêm dòng này để khai báo biến productData
        prod_name: formData.get('product-name'),
        prod_id: formData.get('product-code'),
        prod_cate_id: formData.get('category'),
        prod_weight: formData.get('weight'),
        prod_weight_unit: formData.get('weight-unit')
    };

    try {
        // Gửi yêu cầu lưu sản phẩm cùng với hình ảnh
        await axios.post("http://localhost:8081/api/prod/saveProd", productData);
        // Sau khi lưu thành công, làm mới dữ liệu sản phẩm
        const response = await axios.get("http://localhost:8081/api/prod/getAllProd");
        // Cập nhật danh sách sản phẩm trên client với dữ liệu mới
        setPosts(response.data);
        setShowForm(false);
        setShowCreateForm(false);
    } catch (error) {
        console.error("Error saving product:", error);
    }
};

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchInputChangeId = (event) => {
        setSearchInputId(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8081/api/prod/searchProds?prod_name=${searchInput}`
            );
            setSearchResult(response.data); // Cập nhật searchResult với kết quả từ server
            setIsSearching(true);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };
    const handleSearchId = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8081/api/prod/searchProdsId?prod_id=${searchInputId}`
            );
            setSearchResult(response.data); // Cập nhật searchResult với kết quả từ server
            setIsSearching(true);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };
    const handleDelete = async (prodId) => {
        try {
            const response = await axios.post(
                "http://localhost:8081/api/prod/delProd",
                { prod_id: prodId }
            );
            setRefreshData(refreshData.data)
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:8081/api/prod/editProdId/${editProduct.prod_id}`, editProduct);
            const response = await axios.get("http://localhost:8081/api/prod/getAllProd");
            setPosts(response.data); // Cập nhật lại dữ liệu
            setEditProduct(null); // Đóng popup sau khi cập nhật thành công
            setShowEditForm(false); // Ẩn form chỉnh sửa sau khi cập nhật thành công
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
    };

    
    const editPopup = editProduct && (
        <div className="popup">
            <div className="popup-inner overlay">
                <h2>Edit Product</h2>
                <div className="form-group">
                    <label htmlFor="edit-product-id">Mã sản phẩm:</label>
                    <input type="text" id="edit-product-id" value={editProduct.prod_id} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-product-name">Tên sản phẩm:</label>
                    <input type="text" id="edit-product-name" value={editProduct.prod_name} onChange={(event) => setEditProduct({ ...editProduct, prod_name: event.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-product-info">Thông tin sản phẩm:</label>
                    <textarea id="edit-product-info" value={editProduct.prod_info} onChange={(event) => setEditProduct({ ...editProduct, prod_info: event.target.value })}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="edit-product-image">Hình ảnh:</label>
                    <input type="file" id="edit-product-image" />
                </div>
                <div className="popup-editsubmit">
                    <button type="submit" onClick={handleEditSubmit}>Save</button>
                    <button type="button" onClick={() => { setShowEditForm(false); setEditProduct(null); }}>Close</button>
                </div>
            </div>
        </div>
    );


    const createPopup = showCreateForm && (
        <div className="popup">
            <div className="popup-inner overlay">
                <h2>Create New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="product-code">Mã sản phẩm:</label>
                        <input type="text" id="product-code" name="product-code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="product-name">Tên sản phẩm:</label>
                        <input type="text" id="product-name" name="product-name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Danh mục:</label>
                        <select id="category" name="category">
                            <option value="category1">Danh mục 1</option>
                            <option value="category2">Danh mục 2</option>
                            <option value="category3">Danh mục 3</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Khối lượng:</label>
                        <input type="text" id="weight" name="weight" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight-unit">Đơn vị:</label>
                        <input type="text" id="weight-unit" name="weight-unit" />
                    </div>
                    <div className="popup-editsubmit">
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setShowCreateForm(false)}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );

    
    return (
        <div class="main-container d-flex">
            <div className="content">
                {showEditForm && editPopup}
                {createPopup} 
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 px-5 pt-2">
                            <div class="row d-flex align-items-center">
                                <h1 class="col">Kho hàng</h1>
                                <div class="col-auto">
                                    <button class="btn btn-info btn-open" onClick={handleCreateNew}>+ Tạo mới</button>
                                </div>
                            </div>
                        </div>
                        <hr style={{ border: '1px solid #17a2b8' }} />
                        <div class="row py-2 " >
                            <div class="col-md-12">
                                <form class="form-inline" id="search-form" onSubmit={(event) => {
                                    if (searchInput) {
                                        handleSearch(event);
                                    } else {
                                        handleSearchId(event);
                                    }
                                }}>
                                    <div class=" row font-weight-bold text-muted">
                                        <div class="col-md-8 form-group border-right">
                                            <div class="row">
                                            <div class="col-md-4">
                                                    <label htmlFor="product-code">Mã sản phẩm:</label>
                                                    <input type="text" class="form-control" id="product-code" name="searchInputId" value={searchInputId} onChange={handleSearchInputChangeId} />
                                                </div>
                                                <div class="col-md-4">
                                                    <label htmlFor="product-name">Tên sản phẩm:</label>
                                                    <input type="text" class="form-control" id="product-name" name="searchInput" value={searchInput} onChange={handleSearchInputChange} />
                                                </div>
                                                <div class="col-md-4">
                                                    <label htmlFor="category">Danh mục:</label>
                                                    <select id="category" class="form-control"
                                                        aria-label="Default select example">
                                                        <option selected>Open this select menu</option>
                                                        <option value="category1">Danh mục 1</option>
                                                        <option value="category2">Danh mục 2</option>
                                                        <option value="category3">Danh mục 3</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <div class="row align-items-end">
                                                <div class="col-md-10">
                                                    <label htmlFor="date">Thời gian:</label>
                                                    <div class="d-flex">
                                                        <input type="date" id="date" class="form-control" />
                                                        <button
                                                            className="btn btn-info ml-3"
                                                            style={{ paddingTop: 0, paddingBottom: 0, }}
                                                        >
                                                            search
                                                            <i className="fa fa-arrow-down" aria-hidden="true" />
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <table className="table table-striped custom-table font-weight-bold table-responsive">
                                <thead class="bg-info sticky-top">
                                    <tr>
                                        <th scope="col" className="col-md-1"></th>
                                        <th scope="col" className="col-md-1">Mã sản phẩm</th>
                                        <th scope="col" className="col-md-4">Tên sản phẩm</th>
                                        <th scope="col" className="col-md-2">Danh mục</th>
                                        <th scope="col" className="col-md-1">Khối lượng</th>
                                        <th scope="col" className="col-md-1">Đơn vị</th>
                                        <th scope="col" className="col-md-1"></th>
                                    </tr>
                                </thead>
                                <tbody style={{ overflow: 'auto' }}>
                                    {(isSearching ? searchResult : posts).map((warehousemgt, index) => (
                                        <tr key={index}>
                                            <td className="center"><img src={warehousemgt.image_url} alt="Product" /></td>
                                            <td>{warehousemgt.prod_id}</td>
                                            <td>{warehousemgt.prod_name}</td>
                                            <td>{warehousemgt.prod_cate_id}</td>
                                            <td>{warehousemgt.prod_weight}</td>
                                            <td>{warehousemgt.prod_weight_unit}</td>
                                            <td>
                                                <button class="bg-danger btn text-light" onClick={() => handleDelete(warehousemgt.prod_id)}><i class="fa fa-bars" aria-hidden="true"></i></button>
                                                <button className="bg-info btn text-light" onClick={() => handleEdit(warehousemgt)}>
                                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Product;
