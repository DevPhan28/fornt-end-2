
import { useRoutes } from 'react-router-dom'
import './App.css'
import Home from './page/home'
import Register from './page/Register'
import Login from './page/Login'
import Layout from './component/layout'
import Dashboard from './admin/dasboad'
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProduct'
import SingleProduct from './page/DetailCard'
import Cart from './page/carts'
import Checkout from './page/checkOut'
import ShowCheckOut from './admin/ShowCheckOut'


function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "detail/:id",
      element: <SingleProduct />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
    ,
    {
      path: "/cart",
      element: <Cart />
    }
    ,
    {
      path: "/layout",
      element: <Layout />
    }
    ,
    {
      path: "/test/:id",
      element: <SingleProduct />
    }
    ,
    {
      path: "checkout",
      element: <Checkout />
    }
    ,
    {
      path: "/admin/dashboard",
      element: <Dashboard />
    }
    ,
    {
      path: "/admin/add",
      element: <AddProduct />
    },
    {
      path: "/admin/edit/:id",
      element: <EditProduct />
    },
    {
      path: "/admin/checkout",
      element: <ShowCheckOut />
    },
   
  ])
  return element
 
}

export default App
