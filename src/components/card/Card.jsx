import React, {useState, useEffect} from 'react' 
import { useParams } from 'react-router'
import { getComments, getCommentsWithAdd, getCurrentPost, getUsers } from '../actions/posts'
import {useDispatch, useSelector} from "react-redux"
import './card.css'



const Card = (props) => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.posts.users)

   
    const {postid} = useParams()
    const [post, setPost] = useState({})
    
    const [comments, setComments] = useState([])
    
    const user = users.filter(u => u.id === post.userId)

    const [addComment, setAddComment ] = useState()

    const handleTextComment = (e) => {
        setAddComment(e.target.value)   
    }

    
    const handleAddComment = (e) => {
        e.preventDefault()
        
        const obj = {
            id: Date.now(),
            postId: postid,
            body: addComment
        }

        const serialObj = JSON.stringify(obj)
        localStorage.setItem(`${postid}/${Date.now()}`, serialObj)
        // localStorage.setItem('postId', postid)
        // localStorage.setItem('comment', addComment)
        setAddComment('')
        
    }

    useEffect(() => {
        dispatch(getUsers() )
        getCurrentPost(postid, setPost)
        getComments(postid, setComments)
        
    }, [])


    useEffect(() => {
        getCommentsWithAdd(postid, setComments)
        
    }, [addComment])


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
                <div className ='author'>Author of post:
                {user.map(u => <span  key = {u.id}>{u.name}</span>)}
                </div>
                <div className='card-body'>{post.body}</div>

                <div className='title-comments'>Comments</div>
                <div>
                {comments.map((c, index) => <div className='comment'  key = {c.id}> ⚫ {c.body}</div>)}
                </div>

            </div>
            <textarea value = {addComment} onChange={handleTextComment}></textarea>
            <button disabled={!addComment} onClick={handleAddComment}>Add comment</button>
        </div>
    )
}

export default Card