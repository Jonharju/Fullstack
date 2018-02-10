const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')

beforeAll(async () => {
    await Blog.remove({})
    console.log('cleared')

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('get all', () => {
    test('all blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()
        const response = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
        expect(response.body.length).toBe(blogsInDatabase.length)
        const titles = response.body.map(r => r.title)
        blogsInDatabase.forEach(blog => {
            expect(titles).toContain(blog.title)
        })
    })
})

describe('post new', () => {
    test('a valid blog can be added ', async () => {
        const blogsBefore = await blogsInDb()
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
      
        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        const contents = blogsAfter.map(r => r.title)
        expect(contents).toContain('DBs are easy')
    })
    test('if added blog has no value for likes, it should be 0  ', async () => {
        const newBlog = {
            title: 'No one likes this',
            author: 'Lonely Boy',
            url: 'www.lonely4ever.com'
        }
        const blogsBefore = await blogsInDb()

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      
        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsBefore.length + 1)

        const titles = blogsAfter.map(r => r.title)
        const added = blogsAfter.filter(r => r.title === 'No one likes this')
        expect(titles).toContain('No one likes this')
        expect(added[0].likes).toBe(0)
    })
    test('if added blog has no value for title or url, it wont be added  ', async () => {
        const blogsBefore = await blogsInDb()
        const newBlog = {
            author: 'Freddy Failer'
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        const blogsAfter = await blogsInDb()
        const authors = blogsAfter.map(r => r.author)
        expect(blogsBefore.length).toBe(blogsAfter.length)
        expect(authors).not.toContain('Freddy Failer')
    })
})

afterAll(() => {
    server.close()
})