import React, {useEffect } from 'react' 
import './main.css'
import {useDispatch, useSelector} from "react-redux"
import { getPosts } from '../actions/posts'
import Post from './post/Post'

import axios from 'axios'
import { setPosts } from '../../reducers/postsReducer'

const Main = () => {

        const dispatch = useDispatch()
        const posts = useSelector(state => state.posts.items)

        useEffect(() => {
            dispatch(getPosts())
        }, [])
        

        // const r = axios.get("https://jsonplaceholder.typicode.com/posts")
        // .then(response => {
            
        //     const s = response.data
        //    console.log(s)
           
        // })

    console.log(posts)
    return (
        <div>
           
            {posts.map(post => 
                <Post post={post} key={post.id} />
            )}
        </div>
    )
}

export default Main