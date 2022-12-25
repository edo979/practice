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

  it('Test validation message on Sign-up page', () => {
    cy.get('#a-signUp').click()
    cy.get('input#email').clear().type('j@j')
    cy.get('input#password').clear().type('ja')
    cy.get('[type="submit"]').click()
    cy.get('#ivalidEmailMessage').should('exist')
    cy.get('#ivalidPasswordMessage').should('exist')

    cy.get('input#email').clear().type('jah@jah.com')
    cy.get('[type="submit"]').click()
    cy.get('#ivalidEmailMessage').should('not.exist')
    cy.get('#ivalidPasswordMessage').should('exist')

    cy.get('input#email').clear().type('j@j')
    cy.get('input#password').clear().type('jahjah')
    cy.get('[type="submit"]').click()
    cy.get('#ivalidEmailMessage').should('exist')
    cy.get('#ivalidPasswordMessage').should('not.exist')

    cy.get('input#email').clear().type('jah@jah.com')
    cy.get('input#password').clear().type('jahjah')
    cy.get('[type="submit"]').click()
    cy.get('#ivalidEmailMessage').should('not.exist')
    cy.get('#ivalidPasswordMessage').should('not.exist')

    // Delete created user if test passed
    cy.get('#delete-user-btn').click()
    cy.get('#login-link-btn').should('be.visible')
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
