import React from "react";
import {Link} from 'react-router-dom';

class Navbar extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-dark bg-success navbar-expand-sm">
                    <div className="container-fluid">
                        <Link to='/' className="navbar-brand">
                           <i className="fa fa-blog"/> BLOG-MERN
                        </Link>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#simpleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="simpleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link">HOME</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/blogs' className="nav-link">BLOGS</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/admin' className="nav-link">ADMIN-USER</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
export default Navbar;
