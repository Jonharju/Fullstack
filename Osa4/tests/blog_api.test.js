const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML on helppoa',
    author: 'Dany Devaaja',
    url: 'www.dd.com/helppoo',
    likes: 3
  },
  {
    title: 'Architectures',
    author: 'Anthony Arch',
    url: 'www.aa.com/archs',
    likes: 5
  }
]
beforeAll(async () => {
    await Blog.remove({})
    console.log('cleared')

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
describe('get all', () => {
    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
    const response = await api
        .get('/api/blogs')
    
        expect(response.body.length).toBe(initialBlogs.length)
    })
    
    test('a specific blog is within the returned blogs', async () => {
    const response = await api
        .get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('HTML on helppoa')
    })
})

describe('post new', () => {
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'DBs are easy',
            author: 'David Databaser',
            url: 'www.db.com/dbrec',
            likes: 3
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      
        const response = await api
          .get('/api/blogs')
      
        const contents = response.body.map(r => r.title)
      
        expect(response.body.length).toBe(initialBlogs.length + 1)
        expect(contents).toContain('DBs are easy')
      })
})

afterAll(() => {
    server.close()
})