import React from 'react'
import {Form , Button} from 'react-bootstrap'
import '../styles/style.css'
import { CartState } from '../context/Context'
import RatingFilter from './RatingFilter'



const Filter = () => {

    const {filterstate:{byRating ,sort } , filterDispatch} = CartState()
    console.log(sort,"sort")


  return (
    <div className='filters'>
        <span className='title'>Filter Products</span>
        <span>
            <Form.Check inline label='Ascending'  name='group1' type='radio' id={'inline-1'} onChange={() => filterDispatch({
                type:"SORT_BY_PRICE",
                payload:"lowToHigh"
            })}
            checked={sort === "lowToHigh" ? true : false}
            />
            
        </span>
        <span>
            <Form.Check inline label='Descending' name='group1' type='radio' id={'inline-2'} onChange={() => filterDispatch({
                type:"SORT_BY_PRICE",
                payload:"highToLow"
            })}
            checked={sort === "highToLow" ? true : false} />
        </span>
        <span>
            <label style={{paddingRight:10 , color:'white'}} >Rating:</label>
            <RatingFilter rating={byRating}  onClick={(i) =>
            filterDispatch({
              type: "SORT_BY_RATING",
              payload: i + 1,
            })
          } />
        </span>
        <Button onClick={() =>filterDispatch({type:"CLEAR_FILTER"})} variant='light'>Clear Filters</Button>
    </div>
  )
}

export default Filter