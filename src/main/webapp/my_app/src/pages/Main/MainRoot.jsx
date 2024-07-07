import React from 'react'

import {Outlet} from 'react-router-dom'
import UserNavbar from "../../components/Main/UserNavbar";
import Footer from "../../components/Main/Footer";

const MainRoot = () => {
    return (
        <>
            <UserNavbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default MainRoot