import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders title, author and likes', () => {
      const blog = {
        title: 'Title',
        author: 'Author',
        likes: 1
      }
  
      const blogComponent = shallow(<SimpleBlog blog={blog} />)
      
      const infoDiv = blogComponent.find('.info')
      expect(infoDiv.text()).toContain(blog.title)
      expect(infoDiv.text()).toContain(blog.author)

      const likeDiv = blogComponent.find('.likes')
      expect(likeDiv.text()).toContain(blog.likes)
    })

    it('liking the blog twice calls event handler twice', () => {
        const blog = {
            title: 'Title',
            author: 'Author',
            likes: 1
        }
      
        const mockHandler = jest.fn()
      
        const blogComponent = shallow(
            <SimpleBlog 
            blog={blog}
            onClick={mockHandler}
            />
        )
      
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)
      })
  })