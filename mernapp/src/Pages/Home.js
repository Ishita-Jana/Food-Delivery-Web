import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


import { useEffect,useState } from 'react'
import { set } from 'mongoose'



const Home = () => {
const [search, setSearch] = useState('');
const [foodCat, setFoodcat] = useState([]);
const [fooditem, setFooditem] = useState([]);

const loadData = async()=>{

  let response = await fetch("http://localhost:4000/api/foodData",{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    }
    
  
  });

  response = await response.json();
  // console.log(response);
  // console.log(response[0]);
  // console.log(response[1]);
  setFooditem(response[0]);
  setFoodcat(response[1]);
  // console.log(response[0], response[1]);

}


useEffect(()=>{
  loadData()
},[])


  return (
    <div>
      <div><Navbar/></div>
      <div><div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{"objectFit": "contain !important"}}>
              <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner " id='carousel'>
                  <div className='carousel-caption mw-50' style={{"zIndex": "10"}}>
                      <div className="d-flex justify-content-center ">
                          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                          {/* <button className="btn btn-outline-success bg-success text-white " type="submit">Search</button> */}
                      </div>
                  </div>
                  <div className="carousel-item active ">
                    
                      <img src="https://source.unsplash.com/random/900×700?/burger" className="d-block w-100 "   alt="..."/>
                     
                  </div>
                  <div className="carousel-item">
                      <img src="https://source.unsplash.com/random/900×700?/momo" className="d-block w-100 "  alt="..."/>
                      
                  </div>
                  <div className="carousel-item">
                      <img src="https://source.unsplash.com/random/900×700?/chickencurry" className="d-block w-100 "  alt="..."/>
                  </div>
                  
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
              </button>
          </div></div>
        <div className='container' >
            {

              foodCat !==[] ? foodCat.map((data)=> {
                
                return(
                  <div className='row mb-3'>
                  <div key={data._id} className=" fs-3, m-3">
                    {data.CategoryName}

                  </div>
                  <hr/>
                  {
                    fooditem !==[] ? fooditem.filter((item)=>
                   ( item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map(filterItems=>{
                      return(
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                          {/* <Card 
                          foodName={filterItems.name} 
                          options={filterItems.options[0]} 
                          imgSrc={filterItems.img} 
                          desc={filterItems.description}/> */}


                          <Card foodItems={filterItems} 
                          options={filterItems.options[0]}
                          imgSrc={filterItems.img}/>

                          </div>
                      )
                    }):"keep sort"
                  }
                  </div>

              )})
              : ""
            }
                
         
            
            
            
        </div>
      <div><Footer/></div>
    </div>
  )
}

export default Home
