import './cartitems.css';
import {useContext} from "react";
import {ShowContext} from "../../Context/ShowContext";
import remove_icon from '../../assets/cart_cross_icon.png';
import './cartitems.css';

export const CartItems = () => {
    const {getTotalCarAmount,all_product, cartItems, removeFromCart} = useContext(ShowContext);
    if (!all_product || !cartItems) {
        return null; // اگر اطلاعات هنوز بارگیری نشده است، ممکن است ارائه محتوا امکان‌پذیر نباشد
    }

    return (<div className={'cartitems mt-24 mb-52 ms-10 me-10'}>
        <div className="cartitems-format-main hidden sm:grid pt-10 pb-10 ps-0 pe-0  text-[#454545] text-[18px] font-semibold">
            <div className={'col-span-1'}><p>مجصول</p></div>
            <div className={'col-span-1'}><p>عنوان</p></div>
            <div className={'col-span-1'}><p>قیمت</p></div>
            <div className={'col-span-1'}><p>کیفیت</p></div>
            <div className={'col-span-1'}><p>تعداد</p></div>
            <div className={'col-span-1'}><p>حذف</p></div>
        </div>
        <hr className={'h-[3px]   bg-[#e2e2e2] border-0'}/>
        {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
                return (<div>
                    <div
                        className=" ms-10 h-[70px] grid grid-cols-12 mt-10 mb-5 cartitems-format  text-[17px] font-medium    ">
                        <div className={'col-span-2'}>
                            <img src={e.image} alt="" className={'carticon-product-icon'} width={60} height={60}/>
                        </div>
                        <div className={'col-span-8 xl:col-span-2 lg:w-[500px] lg:-ms-36'}><p className={''}>{e.name}</p></div>
                        <div className={' col-span-2 xl:col-span-2 lg:ms-20'}><p className={''}>${e.new_price}</p></div>
                        <div className={ 'col-span-4 xl:col-span-2 lg:ms-16'}>
                            <button className={'cartitems-quantity w-[64px] h-[50px] '}>{cartItems[e.id]}</button>
                        </div>
                        <div className={'col-span-4 xl:col-span-2 xl:ms-10'}><p>{e.new_price * cartItems[e.id]}</p></div>
                        <div className={'col-span-4 xl:col-span-2  xl:ms-10'}><img
                            className={'cartitems-remove-icon w-[15px] mt-0 mb-0 ms-20 me-20 cursor-pointer'}
                            src={remove_icon} onClick={() => {
                            removeFromCart(e.id)
                        }} alt=""/></div>
                    </div>
                </div>)

            }
            return null;
        })}
        <div className="cartitems-down flex mt-[50px] mb-[50px] ms-0 me-0">
            <div className="cartitems-total flex-1 flex flex-col me-[200px] gap-40 ms-10">
                <h1 className={'text-[30px] font-semibold'}>cart Totals</h1>
                <div>
                    <div className={'cartitems-total-item flex justify-around m-2'}>
                        <p> Subtatal</p>
                        <p>${getTotalCarAmount}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item flex justify-around m-2">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item flex justify-around m-2">
                        <h3 className={'font-semibold'}>Total</h3>
                        <h3>${0}</h3>
                    </div>
                </div>
                <button className={'bg-[#ff5a5a] text-white text-[16px] font-semibold cursor-pointer w-[260px] h-[58px] outline-none border-none '}>
                    Proceed To Checkout
                </button>
            </div>
            <div className="cartitems-promocode me-7 pe-10 flex-1 text-[16px] font-medium">
                <p>If you have a promo code,Enter it here</p>
                <div className={'cartitems-promobox flex justify-between w-[504px] mt-16 ps-20 h-[58px] bg-[#eaeaea]'}>
                    <input type="text" placeholder={'کد تخفیف دارید؟'} className={'border-none outline-none bg-transparent text-[16px] w-[330px] h-[50px]  '}/>
                    <button className={'w-[170px] h-[58px] text-[16px] bg-black text-white cursor-pointer '}>Submit</button>
                </div>
            </div>
        </div>
    </div>)
}