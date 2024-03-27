import data_product from '../../assets/all_product';
import {Item} from "../Item/Item";
import './related.css';

export const RelatedProducts = () => {
    return (
        <div className={'relatedproducts flex flex-col  items-center gap-10 h-[90vh] mt-40'}>
            <h1 className={'text-[#171717] text-[50px] font-semibold'}>Related Products</h1>
            <hr className={'w-[200px] h-3 rounded-[10px] bg-[#252525] '}/>
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:col-span-4  relatedproducts-items mt-[50px]  h-auto gap-12 mb-8
            ">  
                {data_product.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                                 old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}