import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import activityReducer from './reducers/activity'

const initialState = {
  email: '',
  name: '',
  age: 0,
  access_token: '',
  userType: 'children',
}

const shelfState = {
  currentShelf: [],
  shelves: [1, 2],
  books: [
    { shelf: 1, book: ['Sandpaper Letter', 'Large Moveable Alphabet', 'Object Moveable Alphabet'] },
    { shelf: 2, book: [1, 2, 3] }
  ],
  ebooks: [1, 2, 3]
}

function reducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'NAME:SET':
      return { ...state, name: payload }
    case 'USER:SET':
      return { ...state, name: payload.name, email: payload.email, age: payload.age, access_token: payload.access_token }
    default:
      return state
  }
}

function shelfReducer (state = shelfState, action) {
  const { type, payload } = action

  switch (type) {
    case 'CURRENTSHELF:SET':
      return { ...state, currentShelf: payload}
    default:
      return state
  }
}
 
const rootReducer = combineReducers({
  user: reducer,
  shelf: shelfReducer,
  activity: activityReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store