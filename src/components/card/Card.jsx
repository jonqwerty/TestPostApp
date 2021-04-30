import React from 'react' 


const Card = (props) => {
    return (
        <div>
            <button onClick={()=>props.history.goBack()} className='back-btn'>Back</button>
            card post
        </div>
    )
}

export default Card