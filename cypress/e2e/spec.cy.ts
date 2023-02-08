beforeEach( () => {
  cy.visit('/');
})

describe('landing page renders correctly', () => {
  it('displays empty input field', () => {
    cy.get('input#searchText').should('exist');
    cy.get('input#searchText').should('contain', '');
  }) 

  it('should display correct input placeholder text', () => {
    cy.get('input#searchText[placeholder="Skriv titel här"]').should('exist');
  })

  it('has search button with correct text', () => {
    cy.get('button').contains('Sök').should('exist');
  })


})