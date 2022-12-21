describe('Test home page route', () => {
  it('Successfuly load route page', () => {
    cy.visit('/')

    cy.contains('Note App')

    cy.get('#login-link-btn').should('have.text', 'Login')
    cy.get('#sign-link-btn').should('have.text', 'Sign-up')
  })

  it('Go to login page', () => {
    cy.visit('/')
    cy.get('#login-link-btn').click()

    cy.get('form')
    cy.contains('Please Login')
    cy.get('[for="email"]').contains('Email address')
    cy.get('[for="password"]').contains('Password')
    cy.get('[type="submit"]').contains('Login')
  })
})
