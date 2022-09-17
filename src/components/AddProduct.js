import React from 'react'
import { FaStar } from "react-icons/fa";
import { useState , useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate , Link  } from "react-router-dom"
import { v4 as uuidv4, v4 } from 'uuid';
import { addProduct } from '../redux/productSlice';
import { storage  } from '../firebase/firebase';
import { ref , uploadBytes  , getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';



const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector(store => store.products.productList);
    const fileref = useRef();
    const [values, setValues] = useState({
        productname: '',
        productcategory:'',
        productprice:'',
        productDescription:''
    });
    const [imageUpload , setImageUpload] = useState(null)
    
    
    const [ratings, setRatings] = useState(1);
    const stars = Array(5).fill(0)
    const handleClick = value => {
        setRatings(value)
    }

    const reset = () => {
        fileref.current.value = "";
      };

    async function uploadFile(imageUpload){      
    const imgRef = ref(storage , `image + ${v4()}`)
    await uploadBytes(imgRef,imageUpload)
    const url = await getDownloadURL(imgRef);
    return url
    }



    const handleAddProduct = async (e) => {
        e.preventDefault()
    setValues({ productname: '' ,productcategory:'',productprice:'' ,productDescription:''  });
    setRatings(1)
        reset()
    
    const result = await uploadFile(imageUpload);
    const today = new Date();
    const  time = today.getHours() + ":" + today.getMinutes() ;
    

    dispatch(addProduct({
        id: uuidv4(),
        productname: values.productname,
        productcategory:values.productcategory,
        productprice:parseInt(values.productprice),
        productDescription:values.productDescription,
        imageUpload:result,
        ratings:ratings,
        time:time


    }));

    navigate('/');

    }


  return (
    <div className='smart'>
    <div className="containerAdd">    
        <h1>Add Product</h1>      
        <form>
            <div className="rowAdd">
                <div className="columnAdd">
                    <label htmlFor="productname">Product Name</label>
                    <input type="text" value={values.productname} 
                     onChange={(e) => setValues({ ...values, productname: e.target.value })} 
                     id="productname" 
                    placeholder="enter the product name" />
                </div>
                <div className="  columnAdd">
                    <label htmlFor="productcategory">Categories</label>
                    <select value={values.productcategory} 
                     onChange={(e) => setValues({ ...values, productcategory: e.target.value })}>
                        <option>Choose..</option>
                        <option value='laptop'>Laptop</option>
                        <option value='mobile' >Mobile</option>
                        <option value='watch'>Watch</option>
                    </select>
                </div>
            </div>
            <div className="  rowAdd">
                <div className="  columnAdd">
                    <label htmlFor="productprice">Price $</label>
                    <input value={values.productprice} 
                     onChange={(e) => setValues({ ...values, productprice: e.target.value })} 
                     type="number" id="productprice" 
                     placeholder="enter the price.." />
                </div>
                <div className="  columnAdd">
                    <label htmlFor="contact">Image Upload</label>
                    <input onChange={(e) => {setImageUpload(e.target.files[0])}} ref={fileref} type="file" name="avatar" accept="image/png, image/jpeg" />
                </div>
            </div>
            <div className="  rowAdd">
                <div className="  columnAdd">
                    <label htmlFor="productDescription">Describe about the Product</label>
                    <textarea value={values.productDescription} 
                     onChange={(e) => setValues({ ...values, productDescription: e.target.value })}
                     id="productDescription" placeholder="Describe about the product" rows="3"></textarea>
                </div>
                <div className="  columnAdd">
                    <label htmlFor="contact">Ratings</label>
                    <div>
                    {stars.map((_, index) => {
                    return (
                        <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        
                        color={(ratings) > index ? colors.orange : colors.grey}
                        style={{
                            marginRight: 10,
                            cursor: "pointer"
                        }}
                        />
                    )
                    })}
                </div>
                </div>
            </div>
            <button className='addbtn' onClick={handleAddProduct} >Submit</button>
            <Link to='/'>
            <button className='addbtncancel mx-2'  >Cancel</button>
            </Link>
            
        </form>
    </div>
    </div>
  )
}

export default AddProduct