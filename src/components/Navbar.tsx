import Notifications from './Notifications'
import mParticleLogo from '../assets/mParticle.svg'
import './Navbar.css'

const Navbar = () => {
    return (
      <>
        <div className="navbar">
        <div className="brand">
            <img className='logo' alt="mParticle logo" src={mParticleLogo}></img>
        </div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><Notifications /></li>
        </ul>
      </div>
      </>
    );
  };
  
export default Navbar;
