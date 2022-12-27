describe('Note create, view, edit and delete', () => {
  const user = { email: 'newUser@new.com', password: 'jahjah' }
  const note = { title: 'Title test note', body: 'Test note body' }
  const note2 = { title: 'Title test note 2', body: 'Test note body 2' }

  before(() => {
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

  after(() => {
    cy.visit('/login').wait(300)
    cy.get('input[name=email]').type(user.email)
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      log: false,
    })

    cy.url().should('include', '/dashboard')
    cy.get('#delete-user-btn').click().wait(300)
    cy.url().should('not.include', '/dashboard')
  })

  it('Should create and view note', () => {
    cy.visit('/login').wait(300)
    cy.get('input[name=email]').type(user.email)
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      log: false,
    })

    cy.url().should('include', '/dashboard')
    cy.get('#user-profile').should('contain', user.email)

    cy.get('#createNoteBtn').click()
    cy.url().should('include', '/notes/new')

    cy.get('#title').type(note.title)
    cy.get('#body').type(note.body)
    cy.get('#saveNoteBtn').click()

    cy.url().should('not.include', '/new')
    cy.get('.card-title').eq(0).should('contain', note.title)

    cy.get('#userNoteCards').parent().click().wait(300)
    cy.get('#noteTitle').should('contain', note.title)
    cy.get('#noteBody').should('contain', note.body)
  })

  it('Should create second note and view two note in dashboard', () => {
    cy.visit('/login').wait(300)
    cy.get('input[name=email]').type(user.email)
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      log: false,
    })

    cy.get('#createNoteBtn').click()
    cy.get('#title').type(note2.title)
    cy.get('#body').type(note2.body)
    cy.get('#saveNoteBtn').click()
    cy.get('.card-title').eq(0).should('contain', note.title)
    cy.get('.card-title').eq(1).should('contain', note2.title)
  })
})
