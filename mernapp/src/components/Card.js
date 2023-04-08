import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from '../components/ContextReducer'
const Card = (props) => {

  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  const priceRef = useRef();
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItems;
  let imgSrc = props.imgSrc;

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  // console.log(foodItem)

  const handleAddToCart = async () => {

    // let food = []
    // console.log(data);
    // for (const item of data) {
    //   if (item.id === foodItem._id) {
    //     food = item;
    //     console.log(food);
    //     break;
    //   }
    // }
    // let k=0;
    // console.log("its j"+ k++);

    // let food1 = []
    // let i=0;
    console.log(foodItem);
    for (const item of data) {
      // console.log(i++);
      // console.log(item);
      // console.log(item.id);
      // console.log(foodItem._id);
      // console.log(item.size);
      // // console.log(item.size);
      // console.log(size);
      if ((item.id === foodItem._id) && (item.size == size)) {
        
        // console.log("True");
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size:size , img:imgSrc})
        return

        // if(food1 !==[]){
          
        //     console.log(item);
        //     if(food1.size === foodItem.size){
             
        //       return
        //     }
          
         
        // }
      }
    }


    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img:imgSrc })
    await console.log(imgSrc);
  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return (
    <div className='me-5 ' sty>
      <div className="card mt-3" style={{ "width": "18rem", "height": "auto" }}>
        <img src={foodItem.img} className="card-img-top" alt="..." style={{ "height": "160px", "objectFit": "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text">{foodItem.description}</p>
          <div className='container w-100'>
            <select className='mt-2 ' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2   rounded  ' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className='d-inline h-100'>
              ₹{finalPrice}
            </div>
          </div>
          <hr />
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Card
