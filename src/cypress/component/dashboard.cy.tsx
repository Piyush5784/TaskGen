import Home from '../../app/page'
import Page from '../../app/page'

describe('<Page />', () => {
    it('should render and display expected content', () => {
        // Mount the React component for the Home page
        cy.mount(<Home />)

        // The new page should contain an h1 with "Home"
        cy.get('h1').contains('Streamline Your Task Management')

        cy.get('a[href="/dashboard"]').should('be.visible').click()
    })
})