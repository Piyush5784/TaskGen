describe('Navigation', () => {
    it('should navigate to the dashboard page', () => {
      cy.visit('http://localhost:3000/')
   
      cy.get('Link[href*="get"]').click()
   
      cy.url().should('include', '/dashboard')
   
      cy.get('h1').contains('Dashboard')
    })
})