import React from 'react'
import { FaStar } from "react-icons/fa";
import { useState , useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate , Link , useParams } from "react-router-dom"
import { v4 as uuidv4, v4 } from 'uuid';
import { editProduct } from '../redux/productSlice';
import { storage  } from '../firebase/firebase';
import { ref , uploadBytes  , getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';


const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

const EditProduct = () => {
    const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector(store => store.products.productList);
  const navigate = useNavigate();
  const fileref = useRef();

    
    const [imageUploads , setImageUpload] = useState(null)
  const existingProduct = products.filter(user => user.id === params.id);
  console.log(existingProduct , 'existingProduct')
  const { productname, productDescription , imageUpload ,productcategory , productprice , ratings } = existingProduct[0];
  const [values, setValues] = useState({
    productname,
    productcategory,
    productprice,
    productDescription,
});
  const [ratingss, setRatings] = useState(ratings)
    const stars = Array(5).fill(0)
    const handleClick = value => {
        setRatings(value)
    }

    

      async function uploadFile(imageUploads){      
        const imgRef = ref(storage , `image + ${v4()}`)
        await uploadBytes(imgRef,imageUploads)
        const url = await getDownloadURL(imgRef);
        return url
        }


  const handleEditProduct = async (e) => {
    e.preventDefault()
    //reset()

const result = await uploadFile(imageUploads);

dispatch(editProduct({
    id: params.id,
    productname: values.productname,
    productcategory:values.productcategory,
    productprice:values.productprice,
    productDescription:values.productDescription,
    imageUpload:imageUploads?result:imageUpload,
    ratings:ratingss,


}));

navigate('/');

}

  return (
    <div className='smart'>
    <div className="containerAdd">
        <h1>Edit Product</h1>
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
                        <option value='men'>Men's</option>
                        <option value='woemn' >Women's</option>
                        <option value='kid'>Kids's</option>
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
                    <label htmlFor="imageUpload">Image Upload</label>
                    <input onChange={(e) => {setImageUpload(e.target.files[0])}} ref={fileref} type="file" name="avatar"  accept="image/png, image/jpeg" />
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
                        
                        color={(ratingss) > index ? colors.orange : colors.grey}
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
            <button className='addbtn' onClick={handleEditProduct} >Submit</button>
            <Link to='/'>
            <button className='addbtncancel mx-2'  >Cancel</button>
            </Link>
        </form>
    </div>
    </div>
  )
}

export default EditProduct