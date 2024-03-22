import React, { Component, useEffect, useState } from 'react';
import './css/bootstrap.min.css';
import Navigation from './common_component/Navigation';
import Footer from './common_component/Footer';
import axios from "axios";

function Content() {
    //Gọi API add new Product để thêm dữ liệu từ form do người dùng nhập vào qua API
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
        // Các trường dữ liệu khác của sản phẩm
    });

    const handleChange = (event) => {
        // const { name, value } = event.target;
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Gọi API để thêm sản phẩm mới
        fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý phản hồi từ API (nếu cần)
                console.log("Product added:", data);
                // Reset form sau khi thêm sản phẩm thành công
                setFormData({
                    title: "",
                    price: "",
                    description: "",
                    image: "",
                    category: "",
                    // Reset các trường dữ liệu khác của sản phẩm
                });
            })
            .catch((error) => {
                console.error("Có lỗi xảy ra:", error);
            });
    };

    //Đẩy dữ liệu API vào combobox
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        // Gọi API khi component được tạo
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Gọi API để lấy danh sách dữ liệu
            const response = await axios.get(
                "https://fakestoreapi.com/products/categories"
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelectChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    //tạo một nút khi bấm vào nó sẽ mở hộp thoại chọn ảnh từ thư mục
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Xử lý tệp đã chọn tại đây (ví dụ: upload tệp lên server, xem trước, ...)

        // In ra thông tin về tệp đã chọn (ví dụ)
        console.log("File selected:", selectedFile.name);
        setFormData({
            ...formData,
            [event.target.name]: selectedFile.name
        });
    };

    const handleButtonClick = () => {
        // Kích hoạt hộp thoại chọn tệp khi người dùng nhấn nút
        const fileInput = document.getElementById("fileInput");
        fileInput.click();
    };

    return (
        <div className="container mt-5">
            <h2>Product Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Enter product title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="Enter product price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows={3}
                        placeholder="Enter product description"
                        defaultValue={""}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="fileInput"
                        //placeholder="Enter product image URL"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/*" // Chỉ chấp nhận các tệp ảnh something change
                    />
                    <button onClick={handleButtonClick}>Choose Image</button>
                </div>
                <div className="form-group">
                    <label htmlFor="selectData">Category:</label>
                    <select
                        name="category"
                        className="form-control"
                        value={selectedValue}
                        onChange={handleSelectChange}
                    >
                        <option value="">Choose an option</option>
                        {data.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item}
                            </option>
                        ))}
                        {/* Add other categories as needed */}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

class NewProduct extends Component {
    render() {
        return (
            <div>
                <Navigation></Navigation>
                <Content></Content>
                <Footer></Footer>
            </div>
        );
    }
}

export default NewProduct;