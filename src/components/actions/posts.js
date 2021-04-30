import axios from 'axios'
import { setIsFetcing, setPosts } from '../../reducers/postsReducer'

export const getPosts = () => {
    
        return async (dispatch) => {
            dispatch(setIsFetcing(true))
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            dispatch(setPosts(response.data))
        }
     
}



export const getCurrentPost = async (postid, setPost) => {
    
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}`)
        setPost (response.data) 
    }

export const getUsers = async (setUsers) => {
    
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        setUsers (response.data) 
    }

export const getComments = async (postid, setComments) => {
    
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
        setComments (response.data) 
    }

 

