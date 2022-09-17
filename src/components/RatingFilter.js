import React from 'react'
import { FaStar } from 'react-icons/fa'
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};
const RatingFilter = ({rating , onClick}) => {
    //const [ratings, setRatings] = useState(rating);
    const stars = Array(5).fill(0)
    
    return (
        <>
            <div>
                {stars.map((_, i) => {
                    return (
                        <FaStar
                        key={i}
                        size={24}
                        onClick={() => onClick(i)}                     
                        color={(rating) > i ? colors.orange : colors.grey}
                        style={{
                            marginRight: 10,
                            cursor: "pointer"
                        }}
                        />
                    )
                })}
            </div>

        </>
    )
}

export default RatingFilter