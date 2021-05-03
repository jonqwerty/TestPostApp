import React, {useState, useEffect} from 'react' 
import { useParams } from 'react-router'
import {  getCurrentPost, getUsers } from '../actions/posts'
import {useDispatch, useSelector} from "react-redux"
import './card.css'
import { setAllComments } from '../../reducers/postsReducer'
import { Link, NavLink } from 'react-router-dom'



const Card = (props) => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.posts.users)
    const allComments = useSelector(state => state.posts.comments)

    const {postid} = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    
    const user = users.filter(u => u.id === post.userId)

    const [addComment, setAddComment ] = useState()
    const [newAll, setNewAll ] = useState([])

    
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

    const handleDeleteComment = (e) => {
        e.preventDefault()
        //debugger
        const id =  e.target.value
        const all = JSON.parse(localStorage.getItem('allComments'))

       let newAll =  all.filter(com => com.id !== +id)
       localStorage.setItem('allComments', JSON.stringify(newAll) )
       setNewAll(newAll)
    }

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
    }, [])


     useEffect(() => {
         getCommentsForPost(postid, setComments)
     }, [addComment, newAll])


    return (
        <div>
            <button className='back-btn'><Link className='back-btn' to='/'>Back to list of posts</Link></button>
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
                <NavLink to={'/edit/' + c.id} >
                <button>Edit</button>
                </NavLink>
                
                <button value = {c.id} onClick={handleDeleteComment}>Delete</button>
                
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