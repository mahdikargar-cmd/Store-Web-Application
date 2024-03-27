import React, {useContext, useRef, useState} from 'react'
import logo from '../../assets/logo.png';
import cart_icon from '../../assets/cart_icon.png';
import './navbar.css';
import {Link} from "react-router-dom";
import { ShowContext } from "../../Context/ShowContext";
import {TiThMenu} from "react-icons/ti";

const Navbar = () => {
    const [menu, setMenu] = useState("Shop");
    const {getTotalCarItems} = useContext(ShowContext);
    const menuRef = useRef();
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
    return (
        <div className={'navbar grid grid-cols-12  p-8  '}>
            <div className={'nav-logo flex  col-span-3 items-center gap-10 z-10'}>
                <img src={logo} alt=""/>
                <p className={'text-[#171717] md:text-[38px] font-semibold'}>فروشگاه آل گیر</p>
            </div>
            <ul ref={menuRef}
                className={'hidden  nav-menu md:flex col-span-6  items-center list-none xl:gap-24 sm:gap-8 ps-24 pe-24 text-[#626262] md:text-[20px] font-medium  '}>
                <li className={'flex flex-col items-center justify-center gap-3 '} onClick={() => {
                    setMenu("Shop")
                }}><Link to={'/'}>صفحه اصلی</Link>{menu === "Shop" ?
                    <hr className={'border-none w-[80%] h-1 rounded-xl bg-[#FF4141]'}/> : <></>}</li>
                <li className={'flex flex-col items-center justify-center gap-3 '} onClick={() => {
                    setMenu("mens")
                }}><Link to={'/mens'}>مردانه</Link>{menu === "mens" ?
                    <hr className={'border-none w-[80%] h-1 rounded-xl bg-[#FF4141]'}/> : <></>}</li>
                <li className={'flex flex-col items-center justify-center gap-3'} onClick={() => {
                    setMenu("Womens")
                }}><Link to={'/Womens'}>زنانه</Link>{menu === "Womens" ?
                    <hr className={'border-none w-[80%] h-1 rounded-xl bg-[#FF4141]'}/> : <></>}</li>
                <li className={'flex flex-col items-center justify-center gap-3 '} onClick={() => {
                    setMenu("kids")
                }}><Link to={'/kids'}>بچه گانه</Link>{menu === "kids" ?
                    <hr className={'border-none w-[80%] h-1 rounded-xl bg-[#FF4141]'}/> : <></>}</li>
            </ul>
            <div className={'nav-login-cart col-span-3  hidden md:flex items-center space-x-2 me-0 right-0 ms-20  '}>
                {localStorage.getItem('auth-token') ?
                    <button
                        className={' hover:bg-dark-hard hover:text-white transition-all w-24 h-8  md:w-[157px]  md:h-[58px] outline-none rounded-[75px] text-[#515151] md:text-[20px] md:font-medium bg-white cursor-pointer active:bg-[#f3f3f3]'}
                        onClick={() => {
                            localStorage.removeItem('auth-token');
                            window.location.replace('/');
                        }}>خروج از حساب</button>
                    : <Link to={'/login'}>
                        <button
                            className={' hover:bg-dark-hard hover:text-white transition-all w-24 h-8  md:w-[157px]  md:h-[58px] outline-none rounded-[75px] text-[#515151] md:text-[20px] md:font-medium bg-white cursor-pointer active:bg-[#f3f3f3]'}>
                            ورود
                        </button>
                    </Link>}

                <Link to={'/cart'}>
                    <img src={cart_icon} alt=""/>
                </Link>
                <div
                    className={'nav-cart-count W-[22px] h-[22px] flex justify-center items-center mb-8 p-2 rounded-xl text-[14px] bg-red-600 text-white'}>{getTotalCarItems()}</div>
            </div>
            <div className={'md:hidden flex absolute ms-[350px] mt-4 text-[40px]'} onClick={dropdown_toggle}><TiThMenu/>
            </div>

        </div>
    )
}

export default Navbar
