import './Hero.css';
import hand_icon from '../../assets/hand_icon.png';
import arow_icon from '../../assets/arrow.png';
import hero_iamge from '../../assets/hero_image.png';

export const Hero = () => {
    return (
        <>
            <div className={' grid grid-cols-12 hero  '}>

                <div className=" col-span-6 m-3 mt-16">
                    <h2 className={'md:text-[40px] font-opensans font-bold flex justify-end'}>فصل جدید در راه است</h2>
                    <div>
                        <p className={'md:text-[30px] font-bold flex justify-start ml-10'}>
                            محصولات جذاب برای همه سنین
                        </p>

                    </div>

                    <div
                        className={'mt-[250px] ml-32  flex bg-dark-hard w-[180px] p-3 justify-evenly border rounded-full text-white'}>
                        <div className={''}> آخرین محصولات</div>
                        <img src={arow_icon} alt=""/>
                    </div>
                </div>

                <div className=" col-span-6 md:ml-32 ">
                    <img src={hero_iamge} alt="" className={'md:w-[450px] md:h-[600px]'}/>

                </div>
            </div>

        </>
    )
}