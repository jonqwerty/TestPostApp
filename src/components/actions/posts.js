import axios from 'axios'
import { setIsFetcing, setPosts, setUsers } from '../../reducers/postsReducer'

export const getPosts = () => {
    
        return async (dispatch) => {
            dispatch(setIsFetcing(true))
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            dispatch(setPosts(response.data))
        }
     
}

export const getUsers = () => {
    
    return async (dispatch) => {
        dispatch(setIsFetcing(true))
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        dispatch(setUsers(response.data))
    }
 
}



export const getCurrentPost = async (postid, setPost) => {
    
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}`)
        setPost (response.data) 
    }

// export const getUsers = async (setUsers) => {
    
//         const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
//         setUsers (response.data) 
//     }

export const getComments = async (postid, setComments) => {

    if (localStorage.getItem(postid) !== null) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
        const s = []
        const returnObj = JSON.parse(localStorage.getItem(postid))
        s.push(returnObj)
        const all = response.data.concat(s) 
        setComments (all) 
    } else {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
       
        setComments (response.data) 
    }
    
        
    }

 

