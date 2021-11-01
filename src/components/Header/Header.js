import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
    const {user, logOut} = useAuth();
    return (
        <div className="header">
            <Link to="/home">Home</Link>
            <Link to="/shipping">Shipping</Link>
            {/* <Link to="/register">Register</Link>
            <Link to="/login">Login</Link> */}
            {
                (user.email || user.displayName) ?
                <div className="menuInline">
                    {user.displayName} <button onClick={logOut}>Log Out</button>
                </div> : 
                <div className="menuInline">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            }
        </div>
    );
};
export default Header;