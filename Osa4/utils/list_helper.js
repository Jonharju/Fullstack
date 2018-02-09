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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}