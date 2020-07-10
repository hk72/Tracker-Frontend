import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const initialState = {

}

const reducer = ( state, action ) => {
  return state
}

const middleware = compose(
    applyMiddleware(ReduxThunk),
)

export const store = createStore(
    reducer,
    initialState,
    middleware
)
