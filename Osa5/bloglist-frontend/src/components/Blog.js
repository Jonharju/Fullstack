import React from 'react'


class Blog extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.blog)
    this.state = {
      visible: false,
      blog: props.blog,
      user: props.user
    }
  }
  
  handleClick = (event) => {
    this.setState({visible : !this.state.visible})
  }
  
  addLike = (event) => {
    event.preventDefault() 
    this.props.update(this.state.blog)
  }

  deleteBlog = (event) => {
    event.preventDefault()
    this.props.delete(this.state.blog)
  }

  render() {
    if (this.state.visible) {
      const likes = !this.state.blog.likes ? 0 : this.state.blog.likes
      return (
        <div onClick={this.handleClick} style={blogStyle}>
          {this.state.blog.title}: {this.state.blog.author}
          <div>
          <a href={this.state.blog.url}>{this.state.blog.url}</a>
          <div>Likes: {likes} 
            <button onClick={this.addLike}>Like</button>
          </div>
          <p>Added by {this.state.blog.user.name}</p>
          <button onClick={this.deleteBlog}>delete</button>
          </div>
        </div>
      )
    } else {
      return (
        <div onClick={this.handleClick} style={blogStyle}>
          {this.state.blog.title}: {this.state.blog.author}
        </div>
      )
    }
  }
}
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5 
}
export default Blog