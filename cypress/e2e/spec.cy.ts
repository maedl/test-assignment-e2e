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

describe('usage tests', () => {
  
  it('should be able to type into text input', () => {
    cy.get('input#searchText').type('A new hope').should('have.value', 'A new hope');
  })

  it('should show no results text', () => {
    cy.intercept('GET', 'http://omdbapi.com/?apikey=*', { fixture: 'emptyResponse.json' });
    cy.get('input#searchText').should('have.value', '');
    cy.get('button').click();
    cy.get('p').contains('Inga sökresultat att visa').should('exist');
  })

  it('should show search result correctly', () => {
    cy.intercept('GET', 'http://omdbapi.com/?apikey=*', { fixture: 'mockResponse.json' }).as('mockResponse');
    cy.get('input#searchText').type('A new hope');
    cy.get('input#searchText').should('have.value', 'A new hope');
    cy.get('button').click();
    cy.wait('@mockResponse').its('request.url').should('contain', 'A%20new%20hope');
    cy.get('.movie h3').contains('hope').should('exist');
  })
 
})
