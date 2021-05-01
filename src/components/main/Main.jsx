import React, {useEffect, useState } from 'react' 
import './main.css'
import {useDispatch, useSelector} from "react-redux"
import { getAllComments, getPosts, getUsers } from '../actions/posts'
import Post from './post/Post'

import { setPosts, setCurrentPage } from '../../reducers/postsReducer'
import { createPages } from '../../utils/pagesCreator'
import Filter from './filter/Filter'



const Main = () => {

        const dispatch = useDispatch()
        const posts = useSelector(state => state.posts.items)
        const users = useSelector(state => state.posts.users)
        const allComments = useSelector(state => state.posts.comments)

        const currentPage = useSelector(state => state.posts.currentPage)
        const totalCount = useSelector(state => state.posts.totalCount)
        const perPage = useSelector(state => state.posts.perPage)
        
        const isFetching = useSelector(state => state.posts.isFetching)
        const [searchValue, setSearchValue] = useState('')

        const pagesCount = Math.ceil(totalCount/perPage)
        const pages = []
        createPages(pages, pagesCount, currentPage)

        useEffect(() => {
            dispatch(getPosts())
            dispatch(getUsers() )

            if (localStorage.getItem('allComments') === null) {
                dispatch(getAllComments())
            }
        }, [])

        
        
        const searchHandler = () => {
           console.log('press search')
           
            
           dispatch(setCurrentPage(1))
            if (searchValue === '') {
                dispatch(getPosts())
            }

            dispatch(setCurrentPage(1))

            // search for a complete match
           //const searchPost =  posts.filter(post => post.title === searchValue ) 

           // search for  not complete match
           const searchPost =  posts.filter(post => post.title.includes(searchValue )) 
            dispatch(setPosts (searchPost))
            setSearchValue('')
            
        }

        // const r = axios.get("https://jsonplaceholder.typicode.com/posts")
        // .then(response => {
            
        //     const s = response.data
        //    console.log(s)
           
        // })
    
    

    console.log(users)

    console.log(posts)
    console.log(' allComments Main Component',allComments)
    console.log(totalCount)
    console.log(currentPage)
    return (
        <div>
            <Filter />
            <div className='search'>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value) } type="text" placeholder='Input post name' className='search-input' />
                <button onClick={() => searchHandler()} className='search-btn'>Search</button>
            </div>
           
            {   isFetching === false
                ?                
                posts.slice(perPage*(currentPage-1),(perPage*(currentPage-1)+perPage)).map(post => <Post post={post} key={post.id} />)
                :
                <div className='fetching'>

                </div>
            }

            <div className='pages'>
                {pages.map((page, index) => <span 
                    className={currentPage === page ? 'current-page' : 'page'} 
                    key={index}
                    onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
            </div>
        </div>
    )
}

export default Main