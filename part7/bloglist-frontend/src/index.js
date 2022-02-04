import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import commentsReducer from './reducers/commentsReducers'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
    comments: commentsReducer
  })
  
  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)  )
  )

ReactDOM.render(
  <Provider store={store}>    
    <Router>    
      <App />
    </Router>
  </Provider>,  document.getElementById('root')
)