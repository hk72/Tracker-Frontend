import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const initialState = {
  isLoggedIn: false,
  data: {}
}

const reducer = ( state, action ) => {
  switch(action.type){
    case 'SET_LOGGED_IN':
      if(localStorage.isLoggedIn === undefined){
        localStorage.setItem('isLoggedIn', 'false')
      }
      if(action.payload === 'true'){
        localStorage.isLoggedIn = 'true'
        state = {
          ...state,
          isLoggedIn: true
        }
      }
      else if(action.payload === 'false'){
        localStorage.isLoggedIn = 'false'
        state = {
          ...state,
          isLoggedIn: false
        }
      }
    break
    case 'SET_DATA':
    if(localStorage.label === undefined){
      localStorage.setItem('label', action.payload.label)
    }
    if(localStorage.dataset === undefined){
      localStorage.setItem('dataset', action.payload.dataset)
    }

    localStorage.label = action.payload.label
    localStorage.dataset = action.payload.dataset
    state = {
      ...state,
      data: action.payload
    }

    break
    default :
    break
  }
  return state
}

// const middleware = compose(
//     applyMiddleware(ReduxThunk),
// )

const middleware = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const store = createStore(
    reducer,
    initialState,
    middleware
)
