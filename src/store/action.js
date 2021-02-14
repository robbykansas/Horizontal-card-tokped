export function addWishlist(payload){
  return (dispatch, getState) => {
    dispatch({
      type: 'wishlist/addWishlist',
      payload
    })
  }
}

export function deleteWishlist(payload){
  return (dispatch, getState) => {
    dispatch({
      type: 'wishlist/deleteWishlist',
      payload
    })
  }
}