describe('Login user to app', () => {
  it('Should successfuly login user', () => {
    cy.login('kiki@gmail.com', 'jahjah')
  })
})
