const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
  if(body.title === undefined || body.url === undefined){
    return response.status(400).json({ error: 'content missing' })
  }
  const user = await User.find({})  
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user[0]._id
  })
  //blog
  //  .save()
  //  .then(result => {
  //  response.status(201).json(result)
  //})
  const savedBlog = await blog.save()
  user[0].blogs = user[0].blogs.concat(savedBlog._id)
  await user[0].save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
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