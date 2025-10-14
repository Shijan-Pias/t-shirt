import React from 'react';
import { Outlet } from 'react-router';

const RootLoyout = () => {
    return (
        <div>
            
            <Outlet></Outlet>
        </div>
    );
};

export default RootLoyout;