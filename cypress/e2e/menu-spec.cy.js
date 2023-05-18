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

  it('picks random top-menu link', () => {
    // confirm we see the main page with the "Index page" text
    // https://on.cypress.io/contains
    cy.contains('main', 'Index page')
    // get all navigation links and pick the random one
    // https://on.cypress.io/get
    // and cy.sample from the cypress-map plugin
    // click on the picked navigation link
    cy.get('nav a').sample().click()
    // confirm the URL changes to a or b or c or d top-level page
    cy.location('pathname').should('match', /\/public\/[a-d]\/index.html/)
  })

  it('keeps clicking on the random navigation link', () => {
    // confirm we see the main page with the "Index page" text
    // https://on.cypress.io/contains
    cy.contains('main', 'Index page')
    cy.log('**random navigation**')
    // while there are navigation links
    // click on a randomly selected link
    // Tip: use the recurse function
    // You can recurse while there are navigation links
    // using the "post" callback to click on a random one
    recurse(
      () => cy.get('nav a').should(Cypress._.noop),
      ($a) => $a.length === 0,
      {
        log: false,
        post() {
          cy.get('nav a').sample().click()
        },
      },
    )
    // confirm there are no more navigation links to follow
    // https://on.cypress.io/get
    cy.get('nav a').should('not.exist')

    cy.log('**return to the home page**')
    // while the location URL is not /public/index.html
    // keep going back using the cy.go command
    // https://on.cypress.io/location
    // https://on.cypress.io/go
    recurse(
      () => cy.location('pathname'),
      (pathname) => pathname.endsWith('/public/index.html'),
      {
        log: false,
        post() {
          cy.go('back')
        },
      },
    )
    // confirm we are back on the root page
    // https://on.cypress.io/contains
    cy.contains('main', 'Index page')
  })
})
