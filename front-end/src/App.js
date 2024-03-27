import "./App.css";
import React from "react";
import Navbar from "./Component/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {Shop} from "./Pages/Shop";
import {ShopCategory} from "./Pages/ShopCategory";
import {Product} from "./Pages/Product";
import {LoginSignup} from "./Pages/LoginSignup";
import {Cart} from "./Pages/Cart";
import {Footer} from "./Component/Footer/Footer";
import men_banner from './assets/banner_mens.png';
import women_banner from './assets/banner_women.png';
import kid_banner from './assets/banner_kids.png'


function App() {
    return (
        <div className={"App font-opensans "}>


            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Shop/>}/>
                <Route path={'/mens'} element={<ShopCategory banner={men_banner} categoryy="men"/>}/>
                <Route path={'/Womens'} element={<ShopCategory banner={women_banner} categoryy="women"/>}/>
                <Route path={'/kids'} element={<ShopCategory banner={kid_banner} categoryy="kid"/>}/>


                <Route path={'/product'} element={<Product />}>
                    <Route path={':productId'} element={<Product />} />
                </Route>


                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/login'} element={<LoginSignup/>}/>

            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
