describe('test actual API requests', () => {

  it('should display search result correctly', () => {
    cy.visit('/');
    cy.get('input#searchText').type('the phantom menace').should('have.value', 'the phantom menace');
    cy.get('button').click();
    cy.get('.movie').should('be.greaterThan', 0);
    cy.get('#movie-container .movie h3').contains('Star Wars: Episode I - The Phantom Menace').should('exist');
  })

})