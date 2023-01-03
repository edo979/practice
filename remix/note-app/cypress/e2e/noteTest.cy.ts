describe('Note create, view, edit and delete', { testIsolation: false }, () => {
  const user = { email: 'newUser@new.com', password: 'jahjah' }
  const note = { title: 'Title test note', body: 'Test note body' }
  const note2 = { title: 'Title test note 2', body: 'Test note body 2' }

  before(() => {
    Cypress.session.clearAllSavedSessions()
    cy.signup(user.email, user.password)
  })

  beforeEach(() => {
    cy.visit('/dashboard').wait(300)
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
    cy.url().should('include', '/dashboard')
    cy.get('#user-profile').should('contain', user.email)

    cy.get('#createNoteBtn').click()
    cy.url().should('include', '/notes/new')

    cy.get('#title').type(note.title)
    cy.get('#body').type(note.body)
    cy.get('#saveNoteBtn').click()

    cy.url().should('not.include', '/new')
    cy.get('.card-title').eq(0).should('contain', note.title)

    cy.get('#userNoteCards > a').eq(0).click().wait(300)
    cy.get('#noteTitle').should('contain', note.title)
    cy.get('#noteBody').should('contain', note.body)
  })

  it('Should create second note and view two note in dashboard', () => {
    cy.get('#createNoteBtn').click()
    cy.get('#title').type(note2.title)
    cy.get('#body').type(note2.body)
    cy.get('#saveNoteBtn').click()
    cy.get('.card-title').eq(0).should('contain', note.title)
    cy.get('.card-title').eq(1).should('contain', note2.title)
  })

  it('Show validation message while creating note', () => {
    const inputText = 'jahjah'

    cy.get('#createNoteBtn').click()

    cy.get('#invalidTitle').should('not.be.visible')
    cy.get('#invalidBody').should('not.be.visible')

    cy.get('#saveNoteBtn').click()
    cy.get('#invalidTitle').should('be.visible')
    cy.get('#invalidBody').should('be.visible')

    cy.get('#title').type(inputText)
    cy.get('#saveNoteBtn').click()
    cy.get('#invalidTitle').should('not.be.visible')
    cy.get('#invalidBody').should('be.visible')

    cy.get('#title').clear()
    cy.get('#body').type(inputText)
    cy.get('#saveNoteBtn').click()
    cy.get('#invalidTitle').should('be.visible')
    cy.get('#invalidBody').should('not.be.visible')
  })

  it('Should edit note', () => {
    cy.get('#userNoteCards > a').eq(0).click().wait(300)
    cy.get('#editNoteBtn').click()
    cy.url().should('include', '/edit')

    cy.get('#title').clear().type('Title is edited')
    cy.get('#body').clear().type('Body is edited')
    cy.get('#saveNoteBtn').click()

    cy.get('#noteTitle').should('contain', 'Title is edited')
    cy.get('#noteBody').should('contain', 'Body is edited')
  })

  it('Should show form error message', () => {
    cy.get('#userNoteCards > a').eq(0).click().wait(300)
    cy.get('#editNoteBtn').click()

    cy.get('#invalidTitle').should('not.be.visible')
    cy.get('#invalidBody').should('not.be.visible')

    cy.get('#title').clear()
    cy.get('#body').clear()
    cy.get('#saveNoteBtn').click()

    cy.get('#invalidTitle').should('be.visible')
    cy.get('#invalidBody').should('be.visible')
  })
})
