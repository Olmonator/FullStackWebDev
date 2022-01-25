import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Expandable from './Expandable'

const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 0,
    user: {
      name: 'testUser1',
      username: 'testUsername1'
    }
  }
  const user1 = {
      name: 'testUser1',
      username: 'testUsername1'
  }
  const user2 = {
      name: 'testUser2',
      username: 'testUsername2'
  }

describe('rendering blogs', () => {
  test('renders content without expanding', () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 0,
      user: {
        name: 'testUser1',
        username: 'testUsername1'
      }
    }
    const user1 = {
        name: 'testUser1',
        username: 'testUsername1'
    }
    const user2 = {
        name: 'testUser2',
        username: 'testUsername2'
    }
    const component = render(
        <Blog blog={blog} user={user1} />
    )

    expect(component.container).toHaveTextContent(
      'testTitle'
    )
    expect(component.container).toHaveTextContent(
      'testAuthor'
    )
  })
  let component
  beforeEach(() => {
    component = render(
      <Expandable buttonLabel="view">
        <div className="testDiv" />
      </Expandable>
    )
  })
  
  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).not.toBe(null)
  })
  
  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.expandable')
  
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.expandable')
    expect(div).not.toHaveStyle('display: none')
  })
})

describe('liking blogs', () => {
  test('liking twice', () => {

    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} user={user1} likeBlog={mockHandler} />)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})