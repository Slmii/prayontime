import React                from 'react';
import { Link, NavLink }    from 'react-router-dom';

const Header = () => {

    return (
        <div className="container">
            <nav className="navbar sticky-top navbar-expand-md">        
                <Link to='/' className="navbar-brand" >
                    
                </Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar" aria-controls="collapsingNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsingNavbar">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Eid Al-Fitr
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                Time for Eid Al-Fitr
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Eid Al-Adha
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                Time for Eid Al-Adha
                            </div>
                        </li>
                    </ul>
                </div>        
            </nav>
        </div>
    );
};

export default Header;