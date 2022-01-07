const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        //likes: 7
        __v: 0
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
        _id: "5a422aa71b54a676234d17f8"
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

test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[1]
    console.log(blogToView)
    const resultBlog = await api
      .get(`/api/blogs/`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const processedNoteToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body[1]).toEqual(processedNoteToView)
  })

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

test ('url and title missing from new blog', async () => {
    const newBlog ={
        _id: "123456789",
        author: "testAuthor",
        url: "testURL",
        likes: 12,
        __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
   
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ name: 'foo', username: 'root', passwordHash })
    //console.log("USER_TEST:", user)
    await user.save()
    }, 100000)
    test('New users are returned', async () => {
        await api
          .get('/api/users')
          .expect(200)
          //.expect('Content-Type', /application\/json/)
    })
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    }, 100000)
  
    test('creation fails; username too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ml',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    }, 10000),
    test('creation fails; username missing', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
          name: 'Matti Luukkainen',
          password: 'salainen',
        }
  
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      }, 10000),
      test('creation fails; password too short', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
          username: 'mlukk',
          name: 'Matti Luukkainen',
          password: 'sa',
        }
  
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      }, 10000),
      test('creation fails; password missing', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
          username: 'mluuk',
          name: 'Matti Luukkainen',
        }
  
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      }, 10000),
      test('creation fails; username not unique', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
          username: 'root',
          name: 'Matti Luukkainen',
          password: 'salainen',
        }
  
        await api
          .post('/api/users')
          .send(newUser)
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      }, 10000)
})

afterAll(() => {
  mongoose.connection.close()
})