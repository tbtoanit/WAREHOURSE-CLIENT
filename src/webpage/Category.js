import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import './css/category.css'; // Import file CSS

function Category() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        cateName: '',
        motaDanhMuc: ''
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);
    const [tempCategory, setTempCategory] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8081/api/category/getAllCategories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreateNew = () => {
        console.log("showAddForm before update:", showAddForm);
    setShowAddForm(!showAddForm);
    console.log("showAddForm after update:", !showAddForm);
        setShowUpdateForm(false);
        setSelectedCategory(null);
        setShowPopup(!showPopup);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (selectedCategory) {
                await axios.put(`http://localhost:8081/api/category/updateCate/${selectedCategory.cateId}`, selectedCategory);
            } else {
                await axios.post("http://localhost:8081/api/category/saveCate", newCategory);
            }
            fetchCategories();
            setShowAddForm(false);
            setShowUpdateForm(false);
            setNewCategory({ cateName: '', motaDanhMuc: '' });
            setSelectedCategory(null);
            setShowAddForm(prevState => false);
            
        } catch (error) {
            console.error("Error adding/updating category:", error);
        }
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setShowUpdateForm(true);
        setShowAddForm(false);
        setTempCategory(category); // Lưu bản sao tạm thời của dữ liệu hiện tại
    };


    const handleCancel = () => {
        if (showAddForm && (newCategory.cateName || newCategory.motaDanhMuc)) {
            const confirmClose = window.confirm("Bạn có muốn hủy bỏ việc tạo mới danh mục?");
            if (confirmClose) {
                setShowAddForm(false);
                setNewCategory({ cateName: '', motaDanhMuc: '' });
                setShowPopup(false);
            }
        } else {
            // Khôi phục dữ liệu từ bản sao tạm thời
            if (tempCategory) {
                setSelectedCategory(tempCategory);
                setTempCategory(null);
            }
            setShowAddForm(false);
            setNewCategory({ cateName: '', motaDanhMuc: '' });
            setShowPopup(false);
        }
    };


    const handleDelete = (category) => {
        setSelectedCategoryToDelete(category);
    };

    const confirmDelete = async () => {
        try {
            if (!selectedCategoryToDelete || !selectedCategoryToDelete.cateId) {
                console.error("Không xác định được Danh Mục");
                return;
            }
            await axios.post("http://localhost:8081/api/category/deleteCate", { cateId: selectedCategoryToDelete.cateId });
            fetchCategories();
            setSelectedCategoryToDelete(null);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleToggleDetails = (index) => {
        setSelectedCategory(selectedCategory === index ? null : index);
    };

    return (
        <div>
            <div className="category-header">
                <h1>Quản Lý Danh Mục</h1>
                <button className="btn-create-new" onClick={handleCreateNew}>
                    {showAddForm || showUpdateForm ? "-" : "+"} Tạo Mới
                </button>
            </div>
            <hr ></hr>

            {(showAddForm || showUpdateForm || showPopup) && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <form onSubmit={handleSubmit} className="category-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cateName">Tên Danh Mục:</label>
                                    <textarea
                                        id="cateName"
                                        name="cateName"
                                        value={selectedCategory ? selectedCategory.cateName : newCategory.cateName}
                                        onChange={(event) => {
                                            if (selectedCategory) {
                                                setSelectedCategory({ ...selectedCategory, cateName: event.target.value });
                                            } else {
                                                setNewCategory({ ...newCategory, cateName: event.target.value });
                                            }
                                        }}
                                        placeholder=""
                                        className="form-control wrap-text"
                                    />


                                </div>
                                <div className="form-group">
                                    <label htmlFor="motaDanhMuc">Chú Thích:</label>
                                    <textarea
                                        id="motaDanhMuc"
                                        name="motaDanhMuc"
                                        value={selectedCategory ? selectedCategory.motaDanhMuc : newCategory.motaDanhMuc}
                                        onChange={(event) => {
                                            if (selectedCategory) {
                                                setSelectedCategory({ ...selectedCategory, motaDanhMuc: event.target.value });
                                            } else {
                                                setNewCategory({ ...newCategory, motaDanhMuc: event.target.value });
                                            }
                                        }}
                                        placeholder=""
                                        className="form-control wrap-text"
                                    />

                                </div>
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn-submit">
                                    {selectedCategory ? "Cập Nhật" : "Thêm Danh Mục"}
                                </button>
                                <button className="btn-cancel" onClick={handleCancel}>Hủy Thao Tác</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {selectedCategoryToDelete && (
                <div className="confirmation-modal">
                    <p>Bạn có muốn xóa "{selectedCategoryToDelete.cateName}"?</p>
                    <div className="d-flex justify-content-center" >
                        <button className="btn btn-secondary mr-2" onClick={() => setSelectedCategoryToDelete(null)}>Hủy</button>
                        <button className="btn btn-danger" onClick={confirmDelete}>Xác Nhận</button>
                    </div>
                </div>

            )}
            <div className="category-list">
                <div className="category-row category-header">
                    <div className="category-cell">Tên Danh Mục</div>
                    <div className="category-cell">Chú Thích</div>
                    <div className="category-cell">Thao Tác</div>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    categories.map((category, index) => (
                        <div className="category-row" key={index}>
                            <div className="category-cell">{category.cateName}</div>
                            <div className="category-cell">{category.motaDanhMuc}</div>
                            <div className="category-cell">
                                <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEdit(category)} className="fa-icon" />
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(category)} className="fa-icon" />

                            </div>
                            {selectedCategory === index && (
                                <div className="category-cell">
                                    <div className="details-modal">
                                        <h3>{category.cateName}</h3>
                                        <p>{category.motaDanhMuc}</p>
                                        <FontAwesomeIcon icon={faTimes} onClick={() => handleToggleDetails(index)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Category;
