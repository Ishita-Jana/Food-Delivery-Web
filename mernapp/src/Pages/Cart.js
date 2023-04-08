import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-light'>The cart is empty</div>
            </div>
        )
    }

    const handleCheckOut = async()=>{
        let userEmail=localStorage.getItem("userEmail");
        console.log("hiya")
        let response = await fetch("http://localhost:4000/api/orderData",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
            
        });
        console.log("order Response", response)
        if(response.status === 200){
            dispatch({type: "DROP"})
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive-sm table-responsive'>
                <table class="table table-hover">
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {   
                            data.map((food, index) => (
                                <tr>
                                    <th scope="row" className='text-light'>{index + 1}</th>
                                    <td className='text-light'>{food.name}</td>
                                    <td className='text-light'>{food.qty}</td>
                                    <td className='text-light'>{food.size}</td>
                                    <td className='text-light'>{food.price}</td>
                                    <td className='text-light'><button type='button' className='btn p-0 text-light' onClick={()=>{dispatch({type:"REMOVE", index:index})}}><img src="" alt="" />Delete</button></td>
                                </tr>
                                

                            ))


                           
                        }

                        <div>
                            <h1 className='fs-2 text-light'> Total Price {totalPrice}/-</h1>
                        </div>


                            
                    </tbody>



                </table>
                {
                    <div className='d-flex'>
                        <button className='btn bg-success mt-5 text-light' onClick={handleCheckOut}>Check Out</button>
                        <div>
                        
                    </div>
                    </div>

                    
                    
                }
            </div>
        </div>
    )
}

export default Cart
