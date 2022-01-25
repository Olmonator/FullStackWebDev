import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogCreationForm from './BlogCreationForm'


describe('creating blogs', () => {
  test('test input fields', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogCreationForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#blogTitle')
    const author = component.container.querySelector('#blogAuthor')
    const url = component.container.querySelector('#blogUrl')
    const form = component.container.querySelector('form')

    fireEvent.change(title , {
        target: { value: 'testTitle' } 
    })
    fireEvent.change(author , {
        target: { value: 'testAuthor' } 
    })
    fireEvent.change(url , {
        target: { value: 'testUrl' } 
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls[0][0].title)
    expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
    expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
    expect(createBlog.mock.calls[0][0].url).toBe('testUrl')
  })
})