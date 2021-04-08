import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar