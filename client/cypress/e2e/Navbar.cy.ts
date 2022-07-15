describe("Navbar", () => {
  it("links to landing page", () => {
    cy.visit("http://localhost:3000")
    cy.findByRole("link", {name: "Products"}).click()
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("links to signup", () => {
    cy.visit("http://localhost:3000")
    cy.findByRole("link", {name: "Signup"}).click()
    cy.url().should("eq", "http://localhost:3000/signup")
  })
  
})