import React from 'react';
import Navber from '../components/Navber';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
             
<Outlet></Outlet>
        </div>
    );
};

export default Root;