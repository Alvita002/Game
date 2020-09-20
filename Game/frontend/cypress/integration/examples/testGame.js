describe('Tic-tac-toe', () => {
    it('whoWins', function () {
      cy.visit('http://localhost:3000')
      cy.get('.square').eq(0).click() // X
      cy.get('.square').eq(1).click() // O
      cy.get('.square').eq(2).click() // X
      cy.get('.square').eq(4).click() // O
      cy.get('.square').eq(3).click() // X
      cy.get('.square').eq(7).click() // O
      // winner is O
    })
  })