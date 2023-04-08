import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './ContextReducer';
import Badge from 'react-bootstrap/Badge';
import Modal from '../../src/Modal';
import Cart from '../Pages/Cart';
const Navbar = () => {

  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
    // console.log("inhandle")
  }

  const token = localStorage.getItem("authToken");
  // console.log(token);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4 " to="/"><em>FoodFreaks</em></Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  ">
              <li className="nav-item">
                <Link className="nav-link active   fs-5" aria-current="page" to="/">Home</Link>
              </li>

              {(token) ?
                <li className='me-10 navbar-right nav-item' >
                  <div>
                    <Link className='btn bg-white text-success mx-1' to="/myOrders">My Orders</Link>
                  </div>

                </li>
                :
                ""
              }



              {(token) ?
                <div className='d-flex '>
                  <div>
                    <div className='btn bg-white text-success mx-1'  onClick={()=>setCartView(true)}>
                      My Cart
                      {"  "}
                      <Badge pill-bg="danger">{data.length}</Badge>
                    </div>
                  </div>
                  {cartView? <Modal onClose={()=> setCartView(false)}><Cart/></Modal> : null}
                  <div>
                    <Link className='btn bg-white text-success mx-1' to="/logout" onClick={handleLogout}>LogOut</Link>
                  </div>
                </div>
                :
                <div className='d-flex'>
                  <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>


                  <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>

                </div>
              }
            </ul>


          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
