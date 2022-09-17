import React from 'react'
import { Container , Navbar ,FormControl ,Nav , Dropdown ,Badge , Button } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import {MdProductionQuantityLimits  } from 'react-icons/md'
import {Link} from'react-router-dom'
import { CartState } from '../context/Context'


const Header = () => {

    const{state:{cart , wishlist}, dispatchs , filterDispatch} = CartState()

    
  return (
    <Navbar bg='dark' variant='dark' style={{height:80}} >
        <Container>
          <Link to='/' style={{textDecoration:"none"}}>
          <Navbar.Brand>
             <span>Shopping Cart</span>
             <IoMdHome fontSize='25px' className="mx-2" />
            </Navbar.Brand>
          </Link>
            
            <Navbar.Text className='search'>
                <FormControl style={{width:500}}  onChange={(e) => {
                filterDispatch({
                  type: "SORT_BY_SEARCH",
                  payload: e.target.value,
                });
              }} placeholder='search a product' className='m-auto' />
            </Navbar.Text>
            <Nav>
             <Dropdown align='end'>
                <Dropdown.Toggle style={{backgroundColor:"#fff"}}>
                    <FaShoppingCart color='black' fontSize='25px' />
                    <Badge bg="secondary"  className='mx-1'>{cart.length}</Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{minWidth:370}}>
                    {cart.length > 0 ? (
                    <>
                    {cart.map((prod) => (
                         <span className='cartitem' key={prod.id}>
                         <img src={prod.imageUpload} className='cartItemImg' alt={prod.productname} />
                         <div className='cartItemDetail'>
                            <span>{prod.productname}</span>
                            <span>${prod.productprice}</span>
                         </div>
                         <AiFillDelete fontSize='20px' style={{cursor:"pointer"}} onClick = {() => dispatchs({type:"REMOVE_FROM_CART",payload:prod})} />
                        </span>
                    ))}
                    <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                    </>):(<span style={{padding:10}}>
                        Cart it Empty
                    </span>)}
                    
                </Dropdown.Menu>
             </Dropdown>
            </Nav>
            <Nav>
            <Dropdown align='end'>
                <Dropdown.Toggle variant='light'>
                    <span>Wishlist<Badge bg="secondary"  className='mx-2'>{wishlist.length}</Badge></span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{minWidth:370}}>
                    {wishlist.length > 0 ? (
                    <>
                    {wishlist.map((prod) => (
                         <span className='cartitem' key={prod.id}>
                         <img src={prod.imageUpload} className='cartItemImg' alt={prod.productname} />
                         <div className='cartItemDetail'>
                            <span>{prod.productname}</span>
                            <span>${prod.productprice}</span>
                         </div>
                         
                        </span>
                    ))}
                    
                    </>):(<span style={{padding:10}}>
                        wishlist it Empty
                    </span>)}
                    
                </Dropdown.Menu>
             </Dropdown>
            </Nav>
            <Nav>
                <Link to='/add'>
                <Button variant='light'>Add Product <MdProductionQuantityLimits fontSize={25} /></Button>
                </Link>
                
            </Nav>
            
        </Container>
    </Navbar>
  )
}

export default Header