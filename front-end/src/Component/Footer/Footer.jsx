import './Footer.css';
import footer_logo from '../../assets/logo_big.png';
import instagram_icon from '../../assets/instagram_icon.png';
import pinterest_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';

export const Footer = () => {
    return (
        <div className={'footer flex  justify-center items-center gap-52'}>
            <div className="footer-logo flex items-center gap-20">
                <img src={footer_logo} alt=""/>
                <p className={'text-[#383838] text-[46px] font-bold'}>SHOPPER</p>
            </div>
            <ul className={'footer-links flex list-none gap-52 text-[#252525] text-[20px] '}>
                <li className={'cursor-pointer'}>Company</li>
                <li className={'cursor-pointer'}>Product</li>
                <li className={'cursor-pointer'}>Offices</li>
                <li className={'cursor-pointer'}>About</li>
                <li className={'cursor-pointer'}>Contact</li>
            </ul>
            <div className="footer-social-icon flex gap-20 ">
                <div className="footer-icons-container p-10 pb-6 bg-[#fbfbfb]">
                    <img src={instagram_icon} alt=""/>
                </div>
                <div className="footer-icons-container p-10">
                    <img src={pinterest_icon} alt=""/>
                </div>
                <div className="footer-icons-container p-10">
                    <img src={whatsapp_icon} alt=""/>
                </div>
            </div>
            <div className={'footer-copyright flex items-center gap-32 w-full mb-32 text-[#1a1a1a] text-[20px] '}>
                <hr className={'w-[80%] border-none rounded-lg h-[3px] bg-[#c7c7c7]'}/>
                <p>کپی با ذکر منبع مجاز میباشد (مهدی کارگر)</p>

            </div>
        </div>
    )
}