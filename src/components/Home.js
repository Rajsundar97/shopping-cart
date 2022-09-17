import React from 'react'
import Header from './Header'
import { CartState } from '../context/Context';
import SingleProduct from './SingleProduct';
import Filter from './Filter';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
const Home = () => {
    
    const productList = useSelector((state) => state.products.productList)
    const {
      filterstate: { sort,  byRating, searchQuery },
    } = CartState();

    
    
    const transformProducts = () => {
      let sortedProducts = productList;
      console.log(sortedProducts,"STATEE")
  
      if (sort) {
        sortedProducts = sortedProducts.slice().sort((a, b) =>
          sort === "lowToHigh" ? a.productprice - b.productprice : b.productprice - a.productprice
        );
      }
  
     
  
      if (byRating) {
        sortedProducts = sortedProducts.filter(
          (prod) => prod.ratings >= byRating
        );
      }
  
      if (searchQuery) {
        sortedProducts = sortedProducts.filter((prod) =>
          prod.productname.toLowerCase().includes(searchQuery) || prod.productcategory.toLowerCase().includes(searchQuery)
        );
      }
  
      return sortedProducts;
    };
    
  return (
    <>
       <Header/>
       <div className='py-1 home'>
        <Filter />
        {productList.length ? <div className='productContainer'>
          
          {transformProducts().map((prod) => {
              return <SingleProduct prod={prod} key={prod.id} />
          })}
          
      </div> : <div className="containerDataDisplay">    
        <h1>No records has been added yet.</h1>  
        <Link to='/add'>
            <button className='addbtn'>Add Product</button>
            </Link>    
    </div> }
        
       </div>
    </>
  )
}

export default Home