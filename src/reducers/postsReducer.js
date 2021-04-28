const SET_POSTS = "SET_POSTS"


const initialState = {
    items: [
        
    ],
    isFetching: true
}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS: 
            return {
                ...state,
                items: action.posts
        }
        default:
            return state
    }
}


export const setPosts = (posts) => ({type: SET_POSTS, posts})

