describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')    
    const user = {      
      name: 'testUser',      
      username: 'username',      
      password: 'password'    
    }    
    cy.request('POST', 'http://localhost:3003/api/users/', user)     
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('Login is successful', function() {
        cy.get('#username').type('username')    
        cy.get('#password').type('password')    
        cy.get('#login-button').click()
    
        cy.contains('testUser logged in')
      })
    
      it('Login fails' , function() {
        cy.get('#username').type('username')    
        cy.get('#password').type('wrongPassword')    
        cy.get('#login-button').click()
    
        cy.contains('username could not be logged in')
      })
  })
  describe('Blogs', function() {
      beforeEach(function() {
        cy.login({ username:'username', password:'password'})
      })

      it('New Blog can be created', function() {
        cy.get('#viewForm').click()

        cy.get('#blogTitle').type('Title')    
        cy.get('#blogAuthor').type('Author')
        cy.get('#blogUrl').type('url')

        cy.get('#submit').click()

        cy.contains('Blog has been successfully created')
        cy.contains('Title by Author')
      })

    describe('Blog Mutations', function() {
      beforeEach(function() {
        // create Blog no.1
        cy.get('#viewForm').click()

        cy.createBlog({title: 'Blog1' , author: 'Author', url: 'abc'})
      })

      it('blog can be liked', function() {
        cy.get('#Blog1View').click()
        
        cy.contains('Blog1')
        cy.contains('likes 0')
        cy.contains('like')
          .click()
        cy.contains('likes 1')
      })

      it('blog can be deleted', function() {
        cy.get('#Blog1View').click()
        
        cy.contains('Blog1')
        cy.contains('delete')
          .click()
        cy.should('not.contain', 'Blog1')
      })

      describe('Multiple Blogs', function() {
          beforeEach(function() {
            cy.createBlog({title: 'Blog2' , author: 'Author', url: 'abc'})
            cy.createBlog({title: 'Blog3' , author: 'Author', url: 'abc'})
          })

          it('blogs are ordered correctly', function() {
            cy.get('#Blog3View').click()

            cy.get('#Blog3Like')
              .click()
              .click()
              .click()
            cy.contains('likes 3')
            
            cy.get('#Blog3Hide').click()

            cy.get('[data-cy=blog]').then((blogs) => {
                blogs[0].firstChild.data === 'Blog3'
                blogs[1].firstChild.data === 'Blog1'
                blogs[2].firstChild.data === 'Blog2'
            })
          })
      })
    })
  })
})