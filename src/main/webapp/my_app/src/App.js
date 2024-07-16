import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ROUTES} from './routes/routes';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {AdminContextProvider} from "./context/AdminContext";
import {ProductContextProvider} from "./context/ProductContext";

function App() {
    const routes = createBrowserRouter(ROUTES)
    return (
        <AdminContextProvider>
            <ProductContextProvider>
                <RouterProvider router={routes}>

                </RouterProvider>
            </ProductContextProvider>
        </AdminContextProvider>
    );
}

export default App;
