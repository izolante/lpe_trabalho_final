// fontes do MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPrincipal from './componentes/MenuPrincipal';
import Sobre from './componentes/Sobre';
import NotFound from './componentes/NotFound';
import Home from './componentes/telas/home/Home';
import Login from './componentes/telas/login/Login';
import Acontecimentos from './componentes/telas/acontecimentos/Acontecimentos';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPrincipal/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },  
      {
        path: "Login",
        element: <Login />,
      },     
      {
        path: "acontecimentos",
        element: <Acontecimentos />,
      },       
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);

function App() {


  return (
    <RouterProvider router={router} />
  );
}

export default App;
