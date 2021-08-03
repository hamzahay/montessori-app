import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  username: '',
  shelves: [1, 2, 3],
  books: [
    { shelf: 1, book: [1, 2, 3] },
    { shelf: 2, book: [1, 2, 3] },
    { shelf: 3, book: [1, 2, 3] },
  ],
  userType: 'children',
  currentShelf: [],
  ebooks: [1, 2, 3]
}

function reducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'USERNAME:SET':
      return { ...state, username: payload }
    case 'CURRENTSHELF:SET':
      return { ...state, currentShelf: payload}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))
export default store