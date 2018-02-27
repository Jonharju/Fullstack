import React from 'react'
const BlogForm = ({ onSubmit, handleChange, author, title, url}) => {
    return(
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            type="title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div> 
        <div> 
          author
          <input
            type="author"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url  
          <input
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm