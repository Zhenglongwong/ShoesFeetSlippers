describe("Landing", () => {
    it("clicking on next page for first time should trigger fetch of next page", () => {
        cy.intercept("GET", "/api/products/0", {fixture: "res0.json"}).as("res0")
        cy.intercept("GET", "/api/products/1", {fixture: "res1.json"}).as("res1")

        cy.visit("http://localhost:3000")
        cy.findByRole("button", {name: "»"}).click()
        cy.wait("@res1")
        cy.get("@res1.all").should('have.length', 1)
    })

    it("returning to previously visited page should not trigger refetch", () => {
        cy.intercept("GET", "/api/products/0", {fixture: "res0.json"}).as("res0")
        cy.intercept("GET", "/api/products/1", {fixture: "res1.json"}).as("res1")
        
        cy.visit("http://localhost:3000")
        cy.wait("@res0")
        cy.get("@res0.all").should('have.length', 1)
        cy.findByRole("button", {name: "»"}).click()
        cy.wait("@res1")
        cy.get("@res1.all").should('have.length', 1)
        cy.findByRole("button", {name: "«"}).click()
        cy.wait(500)
        cy.get("@res0.all").should('have.length', 1)
        cy.findByRole("button", {name: "»"}).click()
        cy.wait(500)
        cy.get("@res1.all").should('have.length', 1)
    })
})