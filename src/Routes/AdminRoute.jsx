import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/UseUserRole';
import { useNavigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {user , loading} =useAuth();
    const {role ,isRoleLoading } = useUserRole();
    const navigate = useNavigate();


    
    if(loading || isRoleLoading){
         return <span className="loading loading-dots loading-lg"></span>
    }

    if(!user || role !== "admin"){
        navigate('/forbiden')

    }
    return children;
};

export default AdminRoute;