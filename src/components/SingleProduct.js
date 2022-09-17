import React from 'react'
import {Card , Button , Badge} from 'react-bootstrap'
import Ratings from './Ratings'
import {AiOutlineEdit} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {BsTrash} from 'react-icons/bs'
import {MdOutlineBookmarkAdd} from 'react-icons/md'
import {MdBookmarkAdded} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../redux/productSlice'
import { CartState } from '../context/Context'

const SingleProduct = ({prod}) => {
  const dispatch = useDispatch()

  const{state:{cart , wishlist},dispatchs} = CartState()
  const handleRemoveUser = (id) => {
    
    dispatch(deleteProduct({ id }));
  }
  return (
    <div className='products'>
        
        <Card style={{ width: '18rem',border:'1px solid black' }}>
        <Card.Header className='text-uppercase'><b>{prod.productname}</b></Card.Header>
         <Card.Img variant='top' height='100%' src={prod.imageUpload} />
         <Card.Subtitle className='px-2 py-2' style={{paddingBottom:10}}>
            <span>Price<b>{` : $${prod.productprice}`}</b></span>
            <div className='py-1 fw-light'><span>Category:<b>{prod.productcategory}</b></span></div>           
            <div className='py-1'>{prod.productDescription}</div>
            <Ratings rating={prod.ratings} />
         </Card.Subtitle>
         <div className='d-flex justify-content-around '>
         <Link to={`edit/${prod.id}`}>
         <Badge bg="success" style={{padding:"10px" , cursor:'pointer'}} text="light">Edit <AiOutlineEdit /></Badge>
         </Link>
         <Badge onClick={() => handleRemoveUser(prod.id)} bg="danger" style={{padding:"10px" , cursor:'pointer'}} text="light">Delete <BsTrash /></Badge>
         </div>
         <div className='d-flex justify-content-around align-items-center  '>
          {cart.some(p => p.id === prod.id)?(<Button className='my-3' onClick={() => {
            dispatchs({
              type:"REMOVE_FROM_CART",
              payload:prod
            })
          }} variant='danger' >Remove?</Button>):(<Button onClick={() => {
            dispatchs({
              type:"ADD_TO_CART",
              payload:prod
            })
          }} className='my-3' variant='primary'>Add to Cart</Button>)}
         {wishlist.some(p => p.id === prod.id)?( <Button onClick={() => {
            dispatchs({
              type:"REMOVE_FROM_WISHLIST",
              payload:prod
            })
          }} variant="outline-secondary">wishlist <MdBookmarkAdded color='black' fontSize='25' /></Button>):( <Button onClick={() => {
            dispatchs({
              type:"ADD_TO_WISHLIST",
              payload:prod
            })
          }} variant="outline-secondary">wishlist <MdOutlineBookmarkAdd  fontSize='25' /></Button>)}       
         </div>        
        </Card>
    </div>
  )
}

export default SingleProduct