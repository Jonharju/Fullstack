const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}
const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}