describe('Test home page route', () => {
  beforeEach(() => {
    cy.visit('/').wait(500)
  })

  it('Successfuly load route page', () => {
    cy.contains('Note App')

    cy.get('#login-link-btn').should('have.text', 'Login')
    cy.get('#sign-link-btn').should('have.text', 'Sign-up')
  })

  it('Go to login page', () => {
    cy.get('#login-link-btn').click()

    cy.get('form')
    cy.contains('Please Login')
    cy.get('[for="email"]').contains('Email address')
    cy.get('[for="password"]').contains('Password')
    cy.get('[type="submit"]').contains('Login')
  })

  it('Go to sign up page', () => {
    cy.get('#sign-link-btn').click()

    cy.get('form')
    cy.contains('Please Sign up')
    cy.get('[for="email"]').contains('Email address')
    cy.get('[for="password"]').contains('Password')
    cy.get('[type="submit"]').contains('Sign up')
  })
})
