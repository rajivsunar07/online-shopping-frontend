import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom'

export class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink exact className="nav-link" to="/product/create">Create Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact className="nav-link" to="/login" >Login</NavLink>
                            </li>
                    
                        </ul>
                    </div>
                </nav>
            </div>
            
        )
    }
}

export default Header
