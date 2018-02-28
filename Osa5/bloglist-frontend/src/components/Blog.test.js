import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('after clicking name the details are displayed', () => {
        const blog = {
            title: 'title',
            author: 'author',
            likes: 1,
            url: 'www.site.com',
            user: {name:"name"}
        }
        
        const blogComponent = shallow(<Blog blog={blog} />)
        const nameDiv = blogComponent.find('.name')
        expect(nameDiv.text()).toContain(blog.title)
        expect(nameDiv.text()).toContain(blog.author)
        expect(nameDiv.text()).not.toContain(blog.likes)
        expect(nameDiv.text()).not.toContain(blog.url)
        expect(nameDiv.text()).not.toContain(blog.user.name)
        nameDiv.simulate('click')
      
        const contentDiv = blogComponent.find('.content')
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
        expect(contentDiv.text()).toContain(blog.url)
        expect(contentDiv.text()).toContain(blog.user.name)
      })
})