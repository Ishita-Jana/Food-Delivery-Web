import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const text = "hello"

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:4000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            // for(const item of response){
            //     console.log(item)
            // }
            setorderData(response)

        })



        // await res.map((data)=>{
        //    console.log(orderData)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
        console.log(orderData.orderData)
        console.log(orderData)
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
            {orderData.order_data}
            </div>

            <div className='container'>
                <div className='row'>


                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (

                                        <>
                                            {item.Order_date ?
                                                <div className='m-auto mt-5'>
                                                    {data = item.Order_date}
                                                    <hr />
                                                </div>

                                                :



                                                <>
                                                    {item.name != null ?

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{item.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{item.qty}</span>
                                                                        <span className='m-1'>{item.size}</span>
                                                                        <span className='m-1'>{item.img}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{item.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                                </>


                                            }




                                        </>







                                    )
                                })

                                :

                                "")
                    })

                        :

                        ""}



                    
                       
                       {/* orderData.orderData !== {} ?

                            orderData.orderData.order_data[0].slice(0).reverse().map(item=>{
                                return (
                                    <>
                                    {item.Order_date ? 
                                    <div className='m-auto mt-5'>
                                    { item.Order_date}
                                    <hr />
                                </div>
                                    
                                    : 
                                    <>
                                                        {item.name != null ?
    
                                                            <div className='col-12 col-md-6 col-lg-3' >
                                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                    <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{item.name}</h5>
                                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                            <span className='m-1'>{item.qty}</span>
                                                                            <span className='m-1'>{item.size}</span>
                                                                          
                                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                                ₹{item.price}/-
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            ""
                                                        }
                                                    </>
                                    }
                                    </>
                                )
                            })
                        :""*/}
                         
                         
    
                    
                   
    
    
                </div>
                            
                </div>         
                         
            <div>
                <Footer />
            </div>

        </div >
    )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}
