import React, {useState, useEffect} from 'react' 
import { useParams } from 'react-router'
import { getComments, getCommentsWithAdd, getCurrentPost, getUsers, getAllComments } from '../actions/posts'
import {useDispatch, useSelector} from "react-redux"
import './card.css'
import { setAllComments } from '../../reducers/postsReducer'



const Card = (props) => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.posts.users)
    const allComments = useSelector(state => state.posts.comments)

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
            postId: +postid,
            body: addComment
        }

        // const serialObj = JSON.stringify(obj)
        // localStorage.setItem(`${postid}/${Date.now()}`, serialObj)
        
        const all = JSON.parse(localStorage.getItem('allComments'))

         all.push(obj)
        localStorage.setItem('allComments', JSON.stringify(all) )
        dispatch(setAllComments (all))
        setAddComment('')
        
    }

    const [all, setAll] = useState()

    const getCommentsForPost = (postid, setComments) => {
        //debugger
        const all = JSON.parse(localStorage.getItem('allComments'))
        let commentsForPost = all.filter(c => c.postId === +postid )
        setComments(commentsForPost)
    }

    
    useEffect(() => {
        dispatch(getUsers() )
        getCurrentPost(postid, setPost)

        if (localStorage.getItem('allComments') === null) {
            localStorage.setItem('allComments', JSON.stringify(allComments) )
        }
        
        getCommentsForPost(postid, setComments)
        console.log('log 1')
    }, [])


     useEffect(() => {
         console.log('log 2')
         getCommentsForPost(postid, setComments)
     }, [addComment])


    console.log(post)
    console.log(postid)
    console.log(users)
    console.log(user)
    console.log('allComments',allComments)
    console.log('comments for post',comments)
      
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
                {comments.map((c, index) => <div className='comment'  key = {c.id}> 
                <div>⚫ {c.body}</div>
                <button>Edit</button>
                <button>Delete</button>
                
                </div>
                
                )}
                </div>

            </div>
            <textarea value = {addComment} onChange={handleTextComment}></textarea>
            <button disabled={!addComment} onClick={handleAddComment}>Add comment</button>
        </div>
    )
}

export default Card