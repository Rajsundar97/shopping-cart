import React, { useEffect, useState } from 'react'
import { Button, Col, ListGroup, Row , Image , Form } from 'react-bootstrap'
import { CartState } from '../context/Context'
import Header from './Header'
import '../styles/style.css'
import Ratings from './Ratings'

const Cart = () => {
    const {state:{cart}, dispatchs}  = CartState()
    console.log(cart, 'Cart Page')
    const [total , setTotal] = useState();

    useEffect(() => {
        setTotal(cart.reduce((acc,curr) => acc + curr.productprice*curr.qty,0));
    },[cart])

  return (
    <>
    <Header />
    <div className='home'>
        <div className='productContainer'>
            <ListGroup>
                {cart.map((prod) => (
                    <ListGroup.Item>
                        <Row>
                        <Col md={2}>
                            <Image src={prod.imageUpload} alt={prod.productname} fluid rounded />
                        </Col>
                            <Col md={2}>
                                <span>{prod.productname}</span>
                            </Col>
                            <Col md={2}>
                                ${prod.productprice}
                            </Col>
                            <Col md={2}>
                                <Ratings rating={prod.ratings} />
                            </Col>
                            <Col md={2}>
                            <Form.Control
                                as="select"
                                value={prod.qty}
                                onChange={(e) =>
                                dispatchs({
                                    type: "CHANGE_CART_QTY",
                                    payload: {
                                    id: prod.id,
                                    qty: e.target.value,
                                    },
                                })
                                }
                            >
                                {[...Array(5).keys()].map((x) => (
                                <option key={x + 1}>{x + 1}</option>
                                ))}
                            </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
        <div className='filters summary'>
            <span className='title'>Subtotal {(cart.length)} items</span>
            <span style={{fontWeight:700,fontSize:20}}>Total:${total}</span>
            <Button type='button' disabled={cart.length === 0}>
                Proceed to Checkout
            </Button>
        </div>
    </div>
    </>
    
  )
}

export default Cart