import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ROUTES} from './routes/routes';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {AdminContextProvider} from "./context/AdminContext";

function App() {
    const routes = createBrowserRouter(ROUTES)
    return (
        <AdminContextProvider>
            <RouterProvider router={routes}>

            </RouterProvider>
        </AdminContextProvider>
    );
}

export default App;
