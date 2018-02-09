const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    const reducer = (previous, current) => {
        return (previous.likes > current.likes) ? previous : current
    }
    if(blogs.length === 0) return {}
    
    const fav = blogs.reduce(reducer)
    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}

const mostBlogs = (blogs) => {
    const reducer = (previous, current) => {
        const author = blogs.filter(blog => blog.author === current.author) 
        const most = {
            author: current.author,
            blogs: author.length
        }
        return (previous.blogs > current.blogs) ? previous : most
    }
    if(blogs.length === 0) return {}
    
    const most = blogs.reduce(reducer, {blogs: -1})
    return most
}

const mostLikes = (blogs) => {
    const reducer = (previous, current) => {
        const author = blogs.filter(blog => blog.author === current.author) 
        const likes = totalLikes(author)
        const most = {
            author: current.author,
            likes: likes
        }
        return (previous.likes > current.likes) ? previous : most
    }
    if(blogs.length === 0) return {}
    
    const most = blogs.reduce(reducer, {likes: -1})
    return most
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}