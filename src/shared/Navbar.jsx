import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const Navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((err) => console.error(err))
        Navigate('/')

    }

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            
            <li><NavLink to="/request">Request Blood</NavLink></li>
            <li><NavLink to="/founding-page">Founding</NavLink></li>
            {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
            {user && <li><NavLink to="/blog">Blog</NavLink></li>}
        </>
    );

    return (
        <div className="bg-white w-11/12 mx-auto shadow-md sticky top-0 z-50">
            <div className="navbar container mx-auto">
                <div className="flex-1">
                    <Link to="/" className="flex items-center gap-2 text-red-600 font-bold text-xl">
                        <FaHeart /> BloodCare
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                            {!user ? (
                                <li><NavLink className='btn' to="/login">Login</NavLink></li>
                            ) : (
                                <li><button className='btn' onClick={handleLogOut}>Logout</button></li>
                            )}
                        </ul>
                    </div>
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2">
                            {navLinks}
                            {!user ? (
                                <li><NavLink className='btn' to="/login">Login</NavLink></li>
                            ) : (
                                <li><button className='btn' onClick={handleLogOut}>Logout</button></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
