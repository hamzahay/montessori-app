import axios from 'axios'

export function setUserLogin (payload) {
  return { type: 'USER:SET', payload }
}

export function setCurrentShelf (payload) {
  return { type: 'CURRENTSHELF:SET', payload }
}

export function register (payload) {
  return async (dispatch) => {
    try {
      console.log('on register')
      console.log(payload)
      const response = await axios({
        method: 'POST',
        url: 'https://montessori-app-server.herokuapp.com/register',
        data: payload
      })
      console.log('response', response.data)
      const loginPayload = {
        email: response.data.email,
        parentPin: payload.parentPin
      }
      dispatch(login(loginPayload))
    } catch (err) {
      console.log(err)
    }
  }
}

export function login (payload) {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://montessori-app-server.herokuapp.com/login',
        data: payload
      })
      console.log('login', response.data)
      dispatch(setUserLogin(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}