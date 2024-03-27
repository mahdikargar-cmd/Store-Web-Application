import start_icon from '../../assets/star_icon.png';
import start_dull from '../../assets/star_dull_icon.png';
import './Product.css';
import { useContext } from "react";
import { ShowContext } from '../../Context/ShowContext'; // Correct import

export const ProductDisplay = (props) => {
    const { product } = props;
    const {addToCart} = useContext(ShowContext);
    return (
        <div className={'productdisplay grid grid-cols-12 mt-0 mb-0 ms-[50px] '}>
            <div className="productdisplay-left md:flex flex-wrap gap-[10px]  col-span-12 md:col-span-6 ">
            <div className="productdisplay-img ">
                    <img className={'productdisplay-main-img w-[500px] h-[600px]'} src={product.image} alt=""/>
                </div>
                <div className="productdisplay-img-list flex flex-col gap-8 ">
                    <img className={'h-[163px]  mt-3 md:mt-0'} src={product.image} alt=""/>
                    <img className={'h-[163px] mt-3 md:mt-0'} src={product.image} alt=""/>
                    <img className={'h-[163px] mt-3 md:mt-0'} src={product.image} alt=""/>
                    <img className={'h-[163px] mt-3 md:mt-0'} src={product.image} alt=""/>

                </div>
               
            </div>
            <div className="productdisplay-right    mt-0 mb-0 flex flex-wrap flex-col col-span-6 me-10">
                <h1 className={'text-[#3d3d3d] text-[30px] font-semibold'}>{product.name} </h1>
                <div className="productdisplay-right-star flex items-center mt-[7px] gap-5 text-[#1c1c1c] text-[8px]">
                    <img src={start_icon} alt=""/>
                    <img src={start_icon} alt=""/>
                    <img src={start_icon} alt=""/>
                    <img src={start_icon} alt=""/>
                    <img src={start_dull} alt=""/>
                    <p>(122)</p>
                </div>
                <div
                    className="productdisplay-right-prices flex mt-[30px] mb-20 ms-0 me-0 gap-24 text-[24px] font-semibold ">
                    <div className="productdisplay-right-price-old text-[#818181] line-through ">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new text-[#ff4141] ">
                        ${product.new_price}
                    </div>

                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit commodo, elementum nec class iaculis ultrices
                    curabitur nam sapien litora, mattis cubilia facilisis venenatis pellentesque quisque laoreet. Enim
                    lobortis vulputate mollis dictumst turpis
                </div>
                <div className="productdisplay-right-size">
                    <h1 className={'mt-28 text-[#656565] text-[20px] font-semibold '}></h1>
                    <div className="productdisplay-right-sizes flex  mt-16 mb-16 ms-0 me-0 gap-10 ">
                        <div className={'pt-[9px] pb-[9px] ps-10  pe-10 bg-[#fbfbfb] t cursor-pointer'}>S</div>
                        <div className={'pt-[9px] pb-[9px] ps-10  pe-10  bg-[#fbfbfb] t cursor-pointer'}>M</div>
                        <div className={'pt-[9px] pb-[9px] ps-10  pe-10 bg-[#fbfbfb] t cursor-pointer'}>L</div>
                        <div className={'pt-[9px] pb-[9px] ps-10  pe-10 bg-[#fbfbfb] t cursor-pointer'}>XL</div>
                        <div className={'pt-[9px] pb-[9px] ps-10  pe-10 bg-[#fbfbfb] t cursor-pointer'}>XXL</div>
                    </div>
                </div>
                <button onClick={() => {
                    addToCart(product.id)
                }}
                        className={'pt-6 pb-6 ps-8 pe-8 w-[300px]  font-semibold text-white bg-[#ff4141] mb-[40px] border-none outline-none cursor-pointer'}>Add
                    To Cart
                </button>
                <p className={'productdisplay-right-category mt-12'}><span>Category :</span>Women , T-Shirt , Crop Top
                </p>
                <p className={'productdisplay-right-category font-semibold'}><span>Tags :</span>Modern , Latest</p>

            </div>
        </div>
    )
}