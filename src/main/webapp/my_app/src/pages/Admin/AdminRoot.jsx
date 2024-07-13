import React from 'react'
import AdminLogin from './AdminLogin'
import { Outlet } from 'react-router-dom'
import Navbarr from '../../components/Admin/Navbarr'
import { useAdminContext } from '../../context/AdminContext'

const AdminRoot = () => {
    const [admin] = useAdminContext()
    return (
        <>
            {/* <Navbarr/>
    <Outlet/> */}
            <>
                {
                    localStorage.getItem('admin') ? (
                        <>
                            <Navbarr />
                            <Outlet />
                        </>
                    ) : (
                        <AdminLogin />
                    )
                }
            </>
        </>
    )
}

export default AdminRoot