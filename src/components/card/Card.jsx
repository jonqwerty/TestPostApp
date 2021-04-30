import React, {useState, useEffect} from 'react' 
import { useParams } from 'react-router'
import { getComments, getCurrentPost, getUsers } from '../actions/posts'
import './card.css'


const Card = (props) => {

    const {postid} = useParams()
    const [post, setPost] = useState({})
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    
    const user = users.filter(u => u.id === post.userId)

    useEffect(() => {
        getCurrentPost(postid, setPost)
        getUsers(setUsers)
        getComments(postid, setComments)
        
    }, [])

    

    console.log(post)
    console.log(postid)
    console.log(users)
    console.log(user)
    console.log(comments)
    

    
    return (
        <div>
            <button onClick={()=>props.history.goBack()} className='back-btn'>Back to list of posts</button>
            <div className='card'>
                <div className='title'>{post.title}</div>
                <div className ='name'>Author of post:
                {user.map(u => <span key = {u.id}>{u.name}</span>)}
                </div>
                <div className='body'>{post.body}</div>

                <div>Comments</div>
                <div>
                {comments.map(c => <div key = {c.id}>{c.body}</div>)}
                </div>



            </div>
        </div>
    )
}

export default Card