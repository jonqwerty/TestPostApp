import {combineReducers, createStore, applyMiddleware} from 'redux'
import postsReducer from './postsReducer'
import thunkMiddleware from 'redux-thunk'



const rootReduser = combineReducers({
    posts: postsReducer
})

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))


window.store = store


export default store