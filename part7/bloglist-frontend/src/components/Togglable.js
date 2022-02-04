import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

const Togglable =  React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id={props.buttonId} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

export default Togglable