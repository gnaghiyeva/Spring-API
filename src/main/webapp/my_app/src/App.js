import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ROUTES} from './routes/routes';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {AdminContextProvider} from "./context/AdminContext";
import {ProductContextProvider} from "./context/ProductContext";
import {CategoryContextProvider} from "./context/CategoryContext";

function App() {
    const routes = createBrowserRouter(ROUTES)
    return (
        <AdminContextProvider>
            <ProductContextProvider>
                <CategoryContextProvider>
                    <RouterProvider router={routes}>

                    </RouterProvider>
                </CategoryContextProvider>
            </ProductContextProvider>
        </AdminContextProvider>
    );
}

export default App;
