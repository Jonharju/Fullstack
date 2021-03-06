const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
  test('when list is empty the likes are 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([listWithBlogs[0]])
    expect(result).toBe(5)
  })
  
  test('when list has many blogs the sum equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithBlogs)
    expect(result).toBe(7)
  })
})


describe('favorite blog', () => {
  const listWithBlogs = [
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
  test('when list is empty return empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list has only one blog return its values', () => {
    const result = listHelper.favoriteBlog([listWithBlogs[2]])
    const expected = {
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 2
    }
    expect(result).toEqual(expected)
  })
  
  test('when list has many blogs return the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithBlogs)
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(expected)
  })
})

describe('most blogs', () => {
  const listWithBlogs = [
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
  test('when list is empty return empty array', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list has only one blog return its author and one', () => {
    const result = listHelper.mostBlogs([listWithBlogs[1]])
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result).toEqual(expected)
  })
  
  test('when list has many blogs return the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithBlogs)
    const expected = {
      author: "Robert C. Martin",
      blogs: 2
    }
    expect(result).toEqual(expected)
  })
})

describe('most likess', () => {
  const listWithBlogs = [
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676564d17fc",
      title: "Paradigms in software",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/07/02/TypeWars.html",
      likes: 4,
      __v: 0
    }  
  ]
  test('when list is empty return empty array', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list has only one blog return its author and one', () => {
    const result = listHelper.mostLikes([listWithBlogs[1]])
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(expected)
  })
  
  test('when list has many blogs return the author with most blogs', () => {
    const result = listHelper.mostLikes(listWithBlogs)
    const expected = {
      author: "Robert C. Martin",
      likes: 6
    }
    expect(result).toEqual(expected)
  })
  
  test('when list has more than one blog return its author and one', () => {
    const copylist = listWithBlogs 
    const result = listHelper.mostLikes(copylist.splice(0,3))
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(expected)
  })
})