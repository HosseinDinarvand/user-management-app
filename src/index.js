import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/',
    element: <Home/>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);