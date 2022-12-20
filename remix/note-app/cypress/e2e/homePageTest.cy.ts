describe('Test home page route', () => {
  it('Should contains content', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Note App')
  })
})
