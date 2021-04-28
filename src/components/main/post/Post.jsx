import React from 'react' 
import './post.css'

const Post = (props) => {
    const post = props.post
    return (
        <div className='post'>
            <div className='post-title'>{post.title}</div>
            <div className='post-body'>{post.body}</div>

        </div>
    )
}

export default Post