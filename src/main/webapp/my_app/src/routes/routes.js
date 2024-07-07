import MainRoot from "../pages/Main/MainRoot";
import Home from "../pages/Main/Home/Home";

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
    }
]