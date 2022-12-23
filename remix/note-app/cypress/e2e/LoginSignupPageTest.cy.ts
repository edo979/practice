describe('Validation messages', () => {
  beforeEach(() => {
    cy.visit('/login')

    cy.contains('Please Login')

    cy.get('#ivalidEmailMessage').should('not.exist')
    cy.get('#ivalidPasswordMessage').should('not.exist')
  })

  it('Show validation messages on Login page', () => {
    cy.get('input#email').type('j@j')
    cy.get('[type="submit"]').click()

    cy.get('#ivalidEmailMessage').should('exist')
    cy.get('#ivalidPasswordMessage').should('exist')
  })

  it('Dont show message on valid input', () => {
    cy.get('input#email').type('jah@jjah.jah')
    cy.get('input#password').type('jahjah')
    cy.get('[type="submit"]').click()

    cy.get('#ivalidEmailMessage').should('not.exist')
    cy.get('#ivalidPasswordMessage').should('not.exist')
  })
})
