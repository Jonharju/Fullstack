import React from 'react'
import Blog from './components/Blog'
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
    try{
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      const newList = this.state.blogs.concat(blog)
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

    const blogForm = () => (
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              type="title"
              name="title"
              value={this.state.title}
              onChange={this.handleBlogFieldChange}
            />
          </div> 
          <div> 
            author
            <input
              type="author"
              name="author"
              value={this.state.author}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            url  
            <input
              name="url"
              value={this.state.url}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )

    return (
      <div>
        <div>
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
            {blogForm()}
            {this.state.blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        }
      </div>
    )
  }
}

export default App;
