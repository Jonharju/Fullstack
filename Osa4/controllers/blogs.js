const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = (blog) => {
  return {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
    user: blog.user
  }
}
blogsRouter.get('/', async (request, response) => {
//  Blog
//    .find({})
//    .then(blogs => {
//      response.json(blogs)
//    })
  const blogs =  await Blog
    .find({})
    .populate('user', { username: 1, name: 1})
  response.json(blogs.map(formatBlog))
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try{
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if(body.title === undefined || body.url === undefined){
      return response.status(400).json({ error: 'content missing' })
    }
    const user = await User.findById(decodedToken.id)  
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })
    //blog
    //  .save()
    //  .then(result => {
    //  response.status(201).json(result)
    //})
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch(exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if ( blog.user.toString() === user._id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      console.log(user.blogs)
      user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
      console.log(user.blogs)
      await user.save()
    } else {
      response.status(400).send({ error: 'only the user who added the blog can delete it' })
    }
    response.status(204).end()
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(400).send({ error: 'malformatted id' })
    }    
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const blog = {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter