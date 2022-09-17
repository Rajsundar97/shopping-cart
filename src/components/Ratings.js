import React from 'react'
import { FaStar } from 'react-icons/fa'
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};
const Ratings = ({rating}) => {
    const stars = Array(5).fill(0)
    return (
        <>
            <div>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            color={(rating) > index ? colors.orange : colors.grey}
                            style={{
                                marginRight: 10,
                            }}
                        />
                    )
                })}
            </div>

        </>
    )
}

export default Ratings