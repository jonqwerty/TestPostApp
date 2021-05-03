import axios from 'axios'
import { setIsFetcing, setPosts, setUsers, setAllComments } from '../../reducers/postsReducer'

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

export const getAllComments = () => {
    
    return async (dispatch) => {
        dispatch(setIsFetcing(true))
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`)
        dispatch(setAllComments(response.data))
    }
 
}



export const getCurrentPost = async (postid, setPost) => {
    
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}`)
        setPost (response.data) 
    }



export const getComments = async (postid, setComments) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
   
    setComments (response.data) 
}


export const getCommentsWithAdd = async (postid, setComments) => {
    
     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
     const arr = []
     const s = localStorage
     

     for (var i = 0; i < s.length; i++) { 
         const key = s.key(i)
         const id = key.split('/')[0]
         
         console.log(id + " = " + s.getItem(key))

         

         if (id === postid ) {
             //alert(id + "=" + key)
             const returnObj = JSON.parse(localStorage.getItem(key))
             arr.push(returnObj)
             const all = response.data.concat(arr)
             const allSort = all.sort((a, b) => a.id - b.id) 
             console.log('masiv:',all)
             setComments (allSort)
         } 
        
     }
        
    
    //   if (localStorage.getItem(postid) !== null ) {
    //       const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
        
    //       const s = []
    //       const returnObj = JSON.parse(localStorage.getItem(postid))
    //       s.push(returnObj)
    //       const all = response.data.concat(s) 
    //       setComments (all) 
    //   } else {
    //       const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
       
    //       setComments (response.data) 
    //   }
    
        
    }

 

