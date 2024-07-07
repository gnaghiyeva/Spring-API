import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROUTES } from './routes/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
function App() {
    const routes = createBrowserRouter(ROUTES)
  return (
      <RouterProvider router={routes}>

      </RouterProvider>
  );
}

export default App;
