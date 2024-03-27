import { useContext } from "react";
import { ShowContext } from "../Context/ShowContext";
import drop_down from "../assets/dropdown_icon.png";

import { Item } from "../Component/Item/Item";
import "./Css/ShopCategory.css";

export const ShopCategory = (props) => {
    const { allProducts } = useContext(ShowContext);

    return (
        <div className="shop-category">
            <img
                className="shopcategory-banner block mt-32 mb-32 ms-auto me-auto"
                src={props.banner}
                alt=""
            />
            <div className="shopcategory-indexSort flex mt-0 mb-0 ml-[170px] ms-[170px] justify-between items-center">
                <p>
                    <span className="font-semibold">Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort pt-10 pb-10 pl-20 pe-20 rounded-[40px]">
                    Sort by
                    <img src={drop_down} alt="" />
                </div>
            </div>
            <div className="shopcategory-product mt-20 mb-20 ml-5 grid gap-y-10">
                {allProducts && allProducts.length > 0 ? (
                    allProducts.map((item, i) => {
                        if (props.categoryy === item.category) {
                            return (
                                <Item
                                    key={i}
                                    id={item.id}
                                    name={item.name}
                                    image={item.image}
                                    new_price={item.new_price}
                                    old_price={item.old_price}
                                />
                            );
                        }
                        return null; // اضافه کردن این خط برای رفع وارنینگ

                    })
                ) : (
                    <p className="text-center mt-10">No products found in this category.</p>
                )}
            </div>
            <div className="shopcategory-loadmore inline-flex justify-center items-center mt-[150px] mb-[150px] ml-auto ms-auto w-[233px] h-[69px] rounded-[75px] bg-[#ededed] text-[#787878] text-[18px] font-medium ">
                Explore More
            </div>
        </div>
    );
};
