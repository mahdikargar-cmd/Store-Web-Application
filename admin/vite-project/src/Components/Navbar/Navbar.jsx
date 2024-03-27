import "./navbar.css";
import navlogo from '../../assets/nav-logo.svg';
import navprofile from '../../assets/nav-profile.svg';
function Navbar() {
  return (
    <div className="navbar    ">
      <img src={navlogo} alt="" className="nav-logo " />
        <img src={navprofile} alt="" className="nav-profile"/>
    </div>
  );
}

export default Navbar;
