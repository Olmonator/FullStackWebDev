import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const viewId = props.title + 'View'
  const hideId = props.title + 'Hide'

  return (
    <div>
      <div data-cy="blog" style={hideWhenVisible}>
        {props.title} by {props.author}
        <button id={viewId} onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='expandable'>
        {props.children}
        <button id={hideId} onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Togglable