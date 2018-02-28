import React from 'react'
import { mount, shallow } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged in', () => {

        beforeEach(() => {
            app = mount(<App />)
        })

        it('Login form is showed when not logged in', () =>{
            app.update()

            const loginForm = app.find('.login')
            expect(loginForm.length).toBe(1)

            const blogs = app.find('.blogs')
            expect(blogs.length).toBe(0)
        })
    })

    describe('when user is logged', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }
              
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            app = mount(<App />)
        })
    
        it('all notes are rendered', () => {
          app.update()

          const loginForm = app.find('.login')
            expect(loginForm.length).toBe(0)

            const blogs = app.find('.blogs')
            expect(blogs.length).toBe(1)
            
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(blogService.blogs.length)
        })
      })
})