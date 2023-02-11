describe('User create, logout, login, delete', () => {
  const user = { email: 'newUser@new.com', password: 'jahjah' }

  after(() => {
    cy.visit('/login').wait(300)
    cy.get('input[name=email]').type(user.email)
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      log: false,
    })

    cy.url().should('include', '/dashboard')
    cy.get('#delete-user-btn').click()
    cy.url().should('not.include', '/dashboard')
  })

  it('Should successfuly create user and logout', () => {
    cy.visit('/sign-up').wait(300)
    cy.get('input[name=email]').type(user.email)
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      log: false,
    })

    cy.url().should('include', '/dashboard')
    cy.get('#user-profile').should('contain', user.email)

    cy.get('#logout-btn').click()
    cy.url().should('not.include', '/dashboard')
    cy.get('#login-link-btn').should('be.visible')
  })

  it('Should successfuly login and logout', () => {
    cy.visit('/login').wait(300)
    cy.get('input[name=email]').type(user.email)
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      log: false,
    })

    cy.url().should('include', '/dashboard')
    cy.get('#user-profile').should('contain', user.email)

    cy.get('#logout-btn').click()
    cy.url().should('not.include', '/dashboard')
    cy.get('#login-link-btn').should('be.visible')
  })

  it('Get error message when register with same name', () => {
    cy.visit('/sign-up').wait(300)
    cy.get('#form-error-message').should('not.exist')

    cy.get('input[name=email]').type(user.email)
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      log: false,
    })

    cy.get('#form-error-message').should('be.visible')
  })

  // it('Should successfuly login user', () => {
  //   cy.login('kiki@gmail.com', 'jahjah')
  // })
})
