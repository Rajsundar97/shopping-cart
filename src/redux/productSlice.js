import { createSlice } from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';
import { AiOutlineDelete } from "react-icons/ai";


function getProdutListfromLocalStorage()
{
  const localStorageProduct = window.localStorage.getItem('productList');
  if(localStorageProduct) return JSON.parse(localStorageProduct);
  window.localStorage.setItem('productList',JSON.stringify([]));
  return []
}

const initialState = {
  productList: getProdutListfromLocalStorage()
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {     
      state.productList.push(action.payload);
      const productList = window.localStorage.getItem('productList');
      if(productList)
            {
                const productListArr = JSON.parse(productList);
                productListArr.push({...action.payload});  
                window.localStorage.setItem('productList',JSON.stringify(productListArr));
                toast.success("Product added Successfully")

            }
            else {
              window.localStorage.setItem(
                'productList',
                JSON.stringify([
                  {
                    ...action.payload,
                  },
                ])
              );
            }
    },
    editProduct: (state, action) => {
      
      const productList = window.localStorage.getItem('productList');
          if (productList) {
            const productListArr = JSON.parse(productList);
            productListArr.forEach((product) => {
              if (product.id === action.payload.id) {
                product.productname = action.payload.productname;
                product.productDescription = action.payload.productDescription;
                product.imageUpload = action.payload.imageUpload;
                product.productcategory = action.payload.productcategory;
                product.productprice = action.payload.productprice;
                product.ratings = action.payload.ratings;
                toast(`Product Edited Successfully (${product.productname})`)
              }
            });
            window.localStorage.setItem('productList', JSON.stringify(productListArr));
            state.productList = [...productListArr];
          }
    },
    
    deleteProduct: (state, action) => {
      const productList = window.localStorage.getItem('productList');
 
          if (productList) {
            const productListArr = JSON.parse(productList);
            productListArr.forEach((product, idx) => {
              if (product.id === action.payload.id) {
                productListArr.splice(idx, 1);
                toast(<div>Product deleted Successfully <AiOutlineDelete /></div>)
              }
              
            });
            window.localStorage.setItem('productList', JSON.stringify(productListArr));
            state.productList = productListArr;
          }
    }
  }
});

export const { addProduct , editProduct , deleteProduct } = productSlice.actions;
export default productSlice.reducer;