const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
//  Blog
//    .find({})
//    .then(blogs => {
//      response.json(blogs)
//    })
  const blogs =  await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  //blog
  //  .save()
  //  .then(result => {
  //  response.status(201).json(result)
  //})
  const savedBlog = await blog.save()
  response.json(savedBlog)
})

module.exports = blogsRouter