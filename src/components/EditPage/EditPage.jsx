import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'



const EditPage = () => {

    const history = useHistory()

    const[id, setId] = useState('')
    const[body, setBody] = useState('')
    const[allComments, setAllComments] = useState([])
    const [comment, setComment] = useState({})
    const [commentPostId, setCommentPostId] = useState({})
    const [newAll, setNewAll ] = useState(null)
    
    const handleChangeBody = (e) => {
        setBody( e.target.value)
    }
    
    const handleEditComment = (e) => {
        e.preventDefault()
        const obj = {
            ...comment,
            body: body
        }
        const newAll = allComments.map(c => {
            if (c.id === obj.id) {
                return obj
            }
            return c
        })
        
        localStorage.setItem('allComments', JSON.stringify(newAll) )
        setNewAll(newAll)   
    }

    useEffect(() => {
        //debugger
        const id = history.location.pathname.split('/').pop()
        setId(id)
        const allComments = JSON.parse(localStorage.getItem('allComments'))
        setAllComments(allComments)
        const comment = allComments.find(comment => comment.id === +id)
        setComment(comment)
        setCommentPostId(comment.postId)
        setBody(comment.body)
    },[])


    { if (newAll) {
        return <Redirect to = {`/card/${commentPostId}`} />
    } 

    return(
        <div>
            <textarea value = {body} onChange={handleChangeBody}></textarea>
            <button onClick={handleEditComment}>Edit comment</button>
        </div>
    )
}
    
}

export default EditPage