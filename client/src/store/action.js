import axios from 'axios'

export function setCurrentShelf (payload) {
  return { type: 'CURRENTSHELF:SET', payload }
}

export function login (payload) {
  return async (dispatch) => {
    try {
      console.log('action payload', payload)
      const response = await axios({
        method: 'POST',
        url: 'https://montessori-app-server.herokuapp.com/login',
        data: payload
      })
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }
}