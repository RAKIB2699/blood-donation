import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Loading';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';



const AdminRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    const axiosSecure = useAxiosSecure()
    const {data:role}=useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`https://blood-donation-server-olive.vercel.app/get-user-role?email=${user?.email}`)
            return res.data
        }
    })
    if (!role) return <Loading></Loading>
    if(role?.role=='admin'){
       
        return children;
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>
    
};

export default AdminRoute;