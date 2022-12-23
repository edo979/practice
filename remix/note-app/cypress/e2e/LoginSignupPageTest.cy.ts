describe('Validation messages', () => {
  beforeEach(() => {
    cy.visit('/login').wait(500)

    cy.contains('Please Login')

    cy.get('#ivalidEmailMessage').should('not.exist')
    cy.get('#ivalidPasswordMessage').should('not.exist')
  })

  it('Show validation messages on Login page', () => {
    cy.get('input#email').clear().type('j@j{enter}')
    cy.get('input#password').clear().type('ja{enter}')
    cy.get('[type="submit"]').click()

    cy.get('#ivalidEmailMessage').should('exist')
    cy.get('#ivalidPasswordMessage').should('exist')
  })

  it('Dont show message on valid input', () => {
    cy.get('input#email').clear().type('jah@jjah.jah')
    cy.get('input#password').clear().type('jahjah')
    cy.get('[type="submit"]').click()

    cy.get('#ivalidEmailMessage').should('not.exist')
    cy.get('#ivalidPasswordMessage').should('not.exist')
  })
})

describe('home login sign-up navigation', () => {
  it('Navigate on login and sign-up page', () => {
    cy.visit('/').wait(500)

    cy.get('#login-link-btn').click()
    cy.url().should('include', '/login')

    cy.get('#a-home').click()
    cy.url().should('include', '/')

    cy.get('#login-link-btn').click()

    cy.get('#a-signUp').click()
    cy.url().should('include', '/sign-up')

    cy.get('#a-home').click()
    cy.url().should('include', '/')

    cy.get('#login-link-btn').click()
    cy.get('#a-signUp').click()
    cy.get('#a-login').click()
    cy.url().should('include', '/login')
  })
})
