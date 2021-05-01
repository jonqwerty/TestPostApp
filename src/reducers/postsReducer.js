const SET_POSTS = 'SET_POSTS'
const SET_USERS = 'SET_USERS'
const SET_ALL_COMMENTS = 'SET_ALL_COMMENTS'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'




const initialState = {
    items: [
        
    ],
    users: [

    ],
    comments: [],
    
    isFetching: true,
    currentPage:1,
    perPage: 10,
    totalCount:0
}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS: 
            return {
                ...state,
                items: action.payload,
                totalCount: action.payload.length,
                isFetching: false
            }
        case SET_USERS: 
            return {
                ...state,
                users: action.payload,
                 
            }
        case SET_ALL_COMMENTS: 
            return {
                ...state,
                comments: action.payload,
                 
            }
        case SET_IS_FETCHING:
            return {
                ...state, 
                isFetching: action.payload,

            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
       
        default:
            return state
    }
}


export const setPosts = (posts) => ({type: SET_POSTS, payload:posts})
export const setUsers = (users) => ({type: SET_USERS, payload:users})
export const setAllComments = (comments) => ({type: SET_ALL_COMMENTS, payload:comments})
export const setIsFetcing = (bool) => ({type: SET_IS_FETCHING, payload:bool})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload:page})

