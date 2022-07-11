describe("Landing", () => {
    it("should render product cards", () => {
        cy.viewport('macbook-13')
        cy.intercept("GET", "/api/products/0", {fixture: "res0.json"})
        cy.visit("http://localhost:3000")
    })
})