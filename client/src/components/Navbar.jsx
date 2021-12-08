import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link, withRouter } from 'react-router-dom';
import { SideBarData } from './SidebarData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';

function Navbar(props) {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        if (props.location.pathname !== "/") {
            setSidebar(!sidebar);
        }
    }

    return (
        <IconContext.Provider value={{className: "nav-icons"}}>
            <div className='navbar'>
                <div className="left-menu">
                    <Link to='#' className='menu-bars' onClick={showSidebar} >
                        <FaIcons.FaBars/>
                    </Link>
                    <div className='logo'>
                        <Link to="/" className='logo-link'>
                            <img src='../img/logo.svg' width='150px' alt='Stock Control Logo' />
                        </Link>
                    </div>
                </div>
                <div className='right-menu'>
                    <div>
                        <Link to="#" className='darkTheme'>
                            <FaIcons.FaMoon />
                            <span className="darkTheme-text">Modo oscuro</span>
                        </Link>
                    </div>
                    <div>
                        <Link to="/logout" className='logout'>
                            <IoIcons.IoMdCloseCircle />
                            <span className="logout-text">Cerrar sesión</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* TODO: crear div con z-index: 1 heigh y witdh al 100vw y vh, position fixed, 0 0. y al div sidebar zindex2, cuando hago clic en el primer div tambien se cierra, como este: */}
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} onClick={showSidebar}>
                <ul className='nav-menu-items'>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SideBarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
    )
}

export default withRouter(Navbar);
