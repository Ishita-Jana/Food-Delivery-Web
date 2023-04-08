
import './App.css';
import Home from './Pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Pages/Login';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './Pages/SignUp';
import { CartProvider } from './components/ContextReducer';
import Cart from './Pages/Cart';
import MyOrders from './Pages/MyOrders';
function App() {
  return (
    <CartProvider>
      <Router>
     <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
         
          <Route exact path='/signup' element={<SignUp/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/myOrders' element={<MyOrders/>}/>
          

        </Routes>
     </div>
    </Router>
    </CartProvider>
  );
}

export default App;
