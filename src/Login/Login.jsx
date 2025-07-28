import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';


const Login = () => {
    const { Login, setUser, LoginWithGoogle } = use(AuthContext)
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;




        Login(email, password)
            .then((result) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state || "/")
                const user = result.user;
                setUser(user);
                setError('');
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    const handleGoogleLogin = () => {
        LoginWithGoogle()
            .then((result) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state || "/");
                const user = result.user;
                setUser(user);
                setError('');

            })
            .catch((error) => {
                setError(error.message)
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">


            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-5xl text-center font-bold">Login now!</h1>
                    <form onSubmit={handleLogin}>
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                        <p>Dont have Account? <Link className='text-blue-600' to={'/signin'}>Register</Link></p>
                        <p className='text-center'>Or</p>
                        <button onClick={handleGoogleLogin} className='btn w-full'><FcGoogle />Login With Google</button>
                    </form>
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
                </div>
            </div>
        </div>

    );
};

export default Login;