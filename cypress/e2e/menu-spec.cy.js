// https://github.com/bahmutov/cypress-recurse
import { recurse } from 'cypress-recurse'
// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// watch the video "Pick A Random Menu Link"
// https://youtu.be/xvvL3GRjXCY

describe('Menu', () => {
  beforeEach(() => {
    cy.visit('public/index.html')
  })

  it.only('picks random top-menu link', () => {
    // confirm we see the main page with the "Index page" text
    // https://on.cypress.io/contains
    cy.contains('main', 'Index page')
    // get all navigation links and pick the random one
    // https://on.cypress.io/get
    // and cy.sample from the cypress-map plugin
    // click on the picked navigation link
    cy.get('nav a').sample().click()
    cy.location('pathname').should('match', /\/public\/[a-d]\/index.html/)
  })

  it('keeps clicking on the random navigation link', () => {
    cy.contains('main', 'Index page')
    cy.log('**random navigation**')
    recurse(
      () => cy.get('nav a').should(Cypress._.noop),
      ($a) => $a.length === 0,
      {
        log: false,
        post() {
          cy.get('nav a')
            .then(($a) => Cypress._.sample($a.toArray()))
            .click()
        },
      },
    )
    // confirm there are no more links to follow
    cy.get('nav a').should('not.exist')

    cy.log('**return to the home page**')
    recurse(
      () => cy.location('pathname'),
      (pathname) => pathname.endsWith('/menu/index.html'),
      {
        log: false,
        post() {
          cy.go('back')
        },
      },
    )
    cy.contains('main', 'Index page')
  })
})
