import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    notification: notificationReducer
  })
  
  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)  )
  )

ReactDOM.render(
  <Provider store={store}>    <App />
  </Provider>,  document.getElementById('root')
)