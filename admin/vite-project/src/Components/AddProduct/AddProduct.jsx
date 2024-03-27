import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';
import {useState} from "react";

export const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState( {
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const  handleInputChange = (e) => {
        const {name, value} = e.target;
        setProductDetails({...productDetails, [name]: value});
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        const json = JSON.stringify(image);
        console.log(json); // نمایش اطلاعات تصویر آپلود شده به عنوان JSON
    };

    const Add_product = async () => {
        console.log(productDetails);
        // Add your API call or form submission logic here
        try {
            let responseData;
            let product = productDetails;
            let formData = new FormData();
            formData.append('product', image);
            const uploadResponse = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            });
            const uploadData = await uploadResponse.json();
            responseData = uploadData;

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);
                const addProductResponse = await fetch('http://localhost:5000/addproduct', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });
                const addProductData = await addProductResponse.json();
                if (addProductData.success) {
                    alert("Product Added");
                } else {
                    alert("Failed to add product");
                }
            } else {
                alert("Failed to upload image");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred, please try again later.");
        }
    };


    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>عنوان محصول</p>
                <input
                    type="text"
                    name="name"
                    value={productDetails.name}
                    onChange={handleInputChange}
                    placeholder="عنوان را اینجا بنویسید"
                />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>قیمت</p>
                    <input
                        type="text"
                        name="old_price"
                        value={productDetails.old_price}
                        onChange={handleInputChange}
                        placeholder="قیمت اصلی را اینجا بنویسید"
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>قیمت پیشنهادی</p>
                    <input
                        type="text"
                        name="new_price"
                        value={productDetails.new_price}
                        onChange={handleInputChange}
                        placeholder="قیمت پیشنهادی را اینجا بنویسید"
                    />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>دسته بندی محصول</p>
                <select
                    name="category"
                    value={productDetails.category}
                    onChange={handleInputChange}
                    className="add-product-selector"
                >
                    <option value="women">زنانه</option>
                    <option value="men">مردانه</option>
                    <option value="kid">کودکانه</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img

                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt=""
                        className="addproduct-thumbnail-img"
                        onChange={handleInputChange}
                    />
                </label>
                <input

                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                    onChange={handleImageChange}

                />
            </div>
            <button onClick={()=>{Add_product().then(r => console.log(r))}} className="addproduct-btn">
                اضافه کردن
            </button>
        </div>
    );
};
