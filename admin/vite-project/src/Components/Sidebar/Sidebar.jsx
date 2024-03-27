import './sidebar.css';
import {Link} from "react-router-dom";
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

export const Sidebar = () => {
    return (
        <div className={'sidebar '}>
            <Link to={'/addproduct'} className={'no-underline t'}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt=""/>
                    <p className={'t'}>Add Product</p>
                </div>
            </Link>
            <Link to={'/listproduct'} className={'no-underline t'}>
                <div className="sidebar-item">
                    <img src={list_product_icon} alt=""/>
                    <p className={'t'}>Product List</p>
                </div>
            </Link>
        </div>
    )
}