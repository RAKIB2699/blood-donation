import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Loading';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';



const CommonRoute = ({ children }) => {
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
    if (!role) return<Loading></Loading>
    if(role?.role=='volunteer' || role?.role=='admin'){
        return children;
    }else{
        
    return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }
    
};

export default CommonRoute;