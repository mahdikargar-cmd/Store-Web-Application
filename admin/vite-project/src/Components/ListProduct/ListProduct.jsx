import {useEffect, useState} from "react";
import cross_icon from '../../assets/cross_icon.png';
import './listproduct.css';

export const ListProduct = () => {
    const [allproducts, setAllproducts] = useState([]);
    const fetchInfo = async () => {
        await fetch('http://localhost:5000/allproducts').then((res) => res.json()).then((data) => {
            setAllproducts(data)
        })
    }
    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_product = async (id) => {
        await fetch("http://localhost:5000/removeproduct", {
            method: "POST",
            headers: {
                Accept: 'Application/json',
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({id: id})
        })
        await fetchInfo();

    }

    return (
        <div className={'list-product'}>
            <h1>All Products</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr/>
                {allproducts.map((product, index) => {

                    return <div key={index}>
                        <div className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt=""
                                 className="listproduct-product-icon"/>
                            <p>{product.name}</p>
                            <p>{product.old_price}</p>
                            <p>{product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => {
                                remove_product(product.id)
                            }} src={cross_icon} alt="" className="listproduct-remove-icon"/>
                        </div>
                        <hr/>
                    </div>
                    console.log(product.image);
                })}
            </div>
        </div>
    )
}