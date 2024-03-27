import './breadcrums.css';
import arrow_icon from '../../assets/breadcrum_arrow.png';

export const BreadCrums = (props) => {
    const {product} = props;
    return (
        <div className={'breadcrum flex items-center gap-8 text-[#5e5e5e] text-[16px] font-semibold mt-16 mb-32 ms-[110px] me-[170px] capitalize'}>
            خانه
            <img src={arrow_icon} alt=""/>
            فروشگاه
            <img src={arrow_icon} alt=""/>
            {product.category}
            <img src={arrow_icon} alt=""/>
            {product.name}
        </div>
    )
}