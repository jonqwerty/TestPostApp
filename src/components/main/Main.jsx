import React, {useEffect, useState } from 'react' 
import './main.css'
import {useDispatch, useSelector} from "react-redux"
import { getPosts, getPost } from '../actions/posts'
import Post from './post/Post'

import axios from 'axios'
import { setPosts } from '../../reducers/postsReducer'

const Main = () => {

        const dispatch = useDispatch()
        const posts = useSelector(state => state.posts.items)
        const isFetching = useSelector(state => state.posts.isFetching)
        const [searchValue, setSearchValue] = useState('')

        useEffect(() => {
            dispatch(getPosts())
        }, [])
        
        const searchHandler = () => {
            if (searchValue === '') {
                dispatch(getPosts())
            }
           const searchPost =  posts.filter(post => post.title === searchValue ) 
            dispatch(setPosts (searchPost))
        }

        // const r = axios.get("https://jsonplaceholder.typicode.com/posts")
        // .then(response => {
            
        //     const s = response.data
        //    console.log(s)
           
        // })

    console.log(posts)
    return (
        <div>
            <div className='search'>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value) } type="text" placeholder='Input post name' className='search-input' />
                <button onClick={() => searchHandler()} className='search-btn'>Search</button>
            </div>
           
            {   isFetching === false
                ?
                posts.map(post => <Post post={post} key={post.id} />)
                :
                <div className='fetching'>

                </div>
            }
        </div>
    )
}

export default Main