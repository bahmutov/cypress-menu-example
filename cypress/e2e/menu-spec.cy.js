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
    //
    // get all navigation links and pick the random one
    // https://on.cypress.io/get
    // and cy.sample from the cypress-map plugin
    // click on the picked navigation link
    //
    // confirm the URL changes to a or b or c or d top-level page
  })

  it('keeps clicking on the random navigation link', () => {
    // confirm we see the main page with the "Index page" text
    // https://on.cypress.io/contains
    //
    cy.log('**random navigation**')
    // while there are navigation links
    // click on a randomly selected link
    // Tip: use the recurse function
    // You can recurse while there are navigation links
    // using the "post" callback to click on a random one
    //
    // confirm there are no more navigation links to follow
    // https://on.cypress.io/get
    //
    cy.log('**return to the home page**')
    // while the location URL is not /public/index.html
    // keep going back using the cy.go command
    // https://on.cypress.io/location
    // https://on.cypress.io/go
    //
    // confirm we are back on the root page
    // https://on.cypress.io/contains
  })
})
