// import logo from './logo.svg';
import React, {useState} from 'react';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import Products from './components/Products';
import Shops from './components/Shops';
import Suppliers from './components/Suppliers';
import EditProduct from './components/EditProduct';
import EditShop from './components/EditShop';
import EditSupplier from './components/EditSupplier';
import EditUser from './components/EditUser';
import AddProduct from './components/AddProduct';
import AddShop from './components/AddShop';
import AddSupplier from './components/AddSupplier';
import Footer from './components/Footer';
import Logout from './components/Logout';

function App() {
  return (
    <div className="App">
      <div id="background">
        <img src="/img/bg.svg" alt="imagen fondo vectorial"/>
      </div>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Login />
          </Route>
          <Route path='/register' exact>
            <Register />
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/usuarios/:pagination'>
            <Users />
          </Route>
          <Route path='/usuario/:id'>
            <EditUser />
          </Route>
          <Route path='/productos/:pagination'>
            <Products />
          </Route>
          <Route path='/producto/nuevo' exact>
            <AddProduct />
          </Route>
          <Route path='/producto/:id'>
            <EditProduct />
          </Route>
          <Route path='/tiendas/:pagination'>
            <Shops />
          </Route>
          <Route path='/tienda/nuevo' exact>
            <AddShop />
          </Route>
            <Route path='/tienda/:id'>
            <EditShop />
          </Route>
          <Route path='/proveedores/:pagination'>
            <Suppliers />
          </Route>
          <Route path='/proveedor/nuevo' exact>
            <AddSupplier />
          </Route>
          <Route path='/proveedor/:id'>
            <EditSupplier />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
