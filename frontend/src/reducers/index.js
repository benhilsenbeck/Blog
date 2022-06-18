import counterReducer from './counter'
import loggedReducer from './isLogged'
import blogReducer from './blogID'
import pollCategoryReducer from './category'
import blogCategoryReducer from './categoryBlog'
import {combineReducers} from 'redux'

const allreducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    setBlogId: blogReducer,
    setPollCategory: pollCategoryReducer,
    setBlogCategory: blogCategoryReducer,
})

export default allreducers