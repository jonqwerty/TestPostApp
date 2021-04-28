import axios from 'axios'
import { setIsFetcing, setPosts } from '../../reducers/postsReducer'

export const getPosts = () => {
    
        return async (dispatch) => {
            dispatch(setIsFetcing(true))
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            dispatch(setPosts(response.data))
        }
     
}

