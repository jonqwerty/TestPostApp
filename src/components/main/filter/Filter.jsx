import React , {useState, useEffect} from 'react' 
import {useDispatch, useSelector} from "react-redux"
import { setFilteredPosts, setPosts } from '../../../reducers/postsReducer'
import { getPosts } from '../../actions/posts'

const Filter = (props) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.posts.users)
    const posts = useSelector(state => state.posts.items)

    const [author, setAuthor] = useState()

    useEffect(() => {
        dispatch(getPosts())
        
    }, [author])

    const handleChangeAuthor = (e) => {
        setAuthor(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (author === 'all') {
            dispatch(getPosts())
        }
        const filteredPosts =  posts.filter(post => post.userId === +author ) 
        dispatch(setPosts (filteredPosts))
        
        console.log('hi', author, filteredPosts )
       
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>Filter by author</div>
                    <select value={author} defaultValue={'DEFAULT'} onChange={handleChangeAuthor}>
                        <option value='DEFAULT'  disabled>Select author</option>
                        <option value='all'>All</option>
                        {
                            users.map(u => <option value={u.id} key={u.id}>{u.name}</option>)
                        }
                        
                    </select>
                <div>
                    <input disabled={!author} type="submit" value="Search"/>
                </div>
            </form>
        </div>
    )
}

export default Filter