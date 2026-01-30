import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBook, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <FiBook />
                    BookCatalog
                </Link>

                <div className="navbar-nav">
                    <Link to="/books" className="nav-link">
                        Books
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <div className="user-info">
                                <div className="user-avatar">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="user-name">{user?.name}</span>
                            </div>
                            <button className="btn btn-secondary" onClick={handleLogout}>
                                <FiLogOut />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">
                                <FiLogIn />
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                <FiUserPlus />
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
