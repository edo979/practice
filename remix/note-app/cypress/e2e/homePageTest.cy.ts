describe('Test home page route', () => {
  it('Should contains content', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Note App')

    cy.get('#login-button').should('have.text', 'Login')
    cy.get('#sign-button').should('have.text', 'Sign-up')
  })
})
