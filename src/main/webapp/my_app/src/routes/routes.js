import MainRoot from "../pages/Main/MainRoot";
import Home from "../pages/Main/Home/Home";
import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminProducts from "../pages/Admin/Products/AdminProducts";
import AddProduct from "../pages/Admin/Products/AddProduct";


export const ROUTES = [
    {
        path: '/',
        element: <MainRoot />,
        children:[
            {
                path:'',
                element:<Home/>
            }
        ]
    },
    {
        path:'/admin',
        element: <AdminRoot/>,
        children:[
            {
                path: '',
                element: <Dashboard/>
            },
            {
                path: 'login',
                element: <AdminLogin />
            },
            {
                path: 'products',
                element: <AdminProducts/>
            },
            {
                path: 'add-product',
                element: <AddProduct/>
            },

        ]
    }
]