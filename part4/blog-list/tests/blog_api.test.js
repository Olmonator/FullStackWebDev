const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../model/blog')
const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]
beforeEach(async () => {  
    await Blog.deleteMany({})  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()  
    blogObject = new Blog(initialBlogs[1])  
    await blogObject.save()
}, 100000)
 
test('blogs are returned as json (blog api)', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned (blog api)', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)
test('get first blog entry (blog api)', async () => {
    const response = await api.get('/api/blogs')
    console.log("TEST: blogapi", response.body)
    expect(response.body[0]).toEqual(initialBlogs[0])
}, 100000)

test('check that unique identifier is called id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body.map(blog => blog.id))
    expect(response.body.map(blog => blog.id)).toBeDefined()
}, 100000)

test('check POST valid', async () => {
    const newBlog ={
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
      'Canonical string reduction'
    )
})

test ('likes to zero', async () => {
    const response = await api.get('/api/blogs')
    console.log("TEST: blogapi", response.body)
    expect(response.body[0].likes).toBe(0)
}, 100000)
afterAll(() => {
  mongoose.connection.close()
})