import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/Home/HomePage";
import CartPage from "../views/Shopping/CartPage";
import OrderHistoryPage from "../views/Shopping/OrderHistoryPage";
import SignIn from "../views/Auth/SignIn";
import Main from "../views/Main";
import OrderSucessPage from "../views/Shopping/OrderSucessPage";
import ViewMorePage from "../views/Shopping/ViewMorePage";
import Rigster from "../views/Auth/Rigster";

let token = JSON.parse(localStorage.getItem("token"));
let router;

if (token == true) {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/Histroy",
          element: <OrderHistoryPage />,
        },
        {
          path: "/sucessfully",
          element: <OrderSucessPage />,
        },
        {
          path: "/viewmorePage/:id",
          element: <ViewMorePage />,
        },
      ],
    },

    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/rgister",
      element: <Rigster />,
    },
  ]);
} else {
  router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/rgister",
      element: <Rigster />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
  ]);
}

export default router;
