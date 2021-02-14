import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  wishlist: []
}

function reducer( state = initialState, action ){
  switch(action.type) {
    case "wishlist/addWishlist":
      return { ...state, wishlist: [...state.wishlist, action.payload] }
    case "wishlist/deleteWishlist":
      return { ...state, wishlist: action.payload}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store