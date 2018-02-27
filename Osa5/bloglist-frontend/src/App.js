import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      url:'',
      author:'',
      title:'',
      user: null,
      username: '',
      password: '',
      error: null,
      message: null
    }
  }

  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  handleBlogFieldChange = (event) => {
    if (event.target.name === 'title') {
      this.setState({ title: event.target.value })
    } else if (event.target.name === 'url') {
      this.setState({ url: event.target.value })
    } else if (event.target.name === 'author') {
      this.setState({ author: event.target.value })
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    try{
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      blog.id = blog._id
      const newList = await blogService.getAll()
      this.setState({
        title: '',
        author:'',
        url:'',
        blogs: newList,
        message:'Blogi '+blog.title +' lisätty'
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch(exception){
      this.setState({
        error: 'Lisäys epäonnistui',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  likeBlog = async (blog) => {
    var updatedBlog = blog
    updatedBlog.likes = !blog.likes ? 1 : blog.likes +1
    const blogObject = {
      id: blog.id,
      user: blog.user._id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const updated = await blogService.update(blogObject.id,blogObject)
    this.setState({
      blogs: this.state.blogs.map((blog) => blog.id === updated.id ? updated : blog)
    })
  }

  deleteBlog = async (blog) => {
    if (window.confirm("Halautko varmasti poistaa blogin?")) {
      if (blog.user.username === this.state.user.username || blog.user == null) {
        await blogService.remove(blog.id)
        this.setState({
          blogs: this.state.blogs.filter(b => b.id !== blog.id)
        })
      } 
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
 
  logout = () => {
    this.setState({user: null})
    window.localStorage.removeItem('loggedBlogappUser')
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
    
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )    

    return (
      <div>
        <div>
          <Notification error={this.state.error} message={this.state.message} />
          <h1>Blogs</h1>
        </div>
        {this.state.user === null ?
          loginForm() :
          <div>
            <div>
              <p>{this.state.user.name} logged in 
                <button onClick= {this.logout}>Logout</button>
              </p>              
            </div>
            <Togglable buttonLabel="Create" ref={component => this.blogForm = component}>
              <BlogForm onSubmit={this.addBlog} handleChange={this.handleBlogFieldChange} title={this.state.title} author={this.state.author} url={this.state.url} />
            </Togglable>
            {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} delete={this.deleteBlog} update={this.likeBlog} user= {this.state.user}/>
            )}
          </div>
        }
      </div>
    )
  }
}

export default App;
