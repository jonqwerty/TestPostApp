import React from 'react' 
import { NavLink } from 'react-router-dom'
import './post.css'

const Post = (props) => {
    const post = props.post
    return (
        <div className='post'>
            <div className='post-title'><NavLink to ={`/card/${post.id}`}>{post.title}</NavLink></div>
            <div className='post-body'>{post.body}</div>

        </div>
    )
}

export default Post