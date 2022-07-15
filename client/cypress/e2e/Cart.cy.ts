import {quantityInput, viewCart, closeCart, addToCart} from "./utils/details.cy"

describe("Cart", () => {
	it("should show newly added items with the correct quantity", () => {
		cy.visit("http://localhost:3000/details/201123944");
		cy.findByRole("radio", { name: "US 7" }).check({ force: true });
		quantityInput().click().type("2");
		addToCart().click();
		viewCart().click();
		cy.findByText(/^qty:/i).should("be.text", "Qty: 12");
    });
    
	it("should update quantity if same item is added", () => {
		cy.visit("http://localhost:3000/details/201123944");
		cy.findByRole("radio", { name: "US 7" }).check({ force: true });
		quantityInput().click().type("2");
		addToCart().click();
		viewCart().click();
		cy.findByText(/^qty:/i).should("be.text", "Qty: 12");
		closeCart().click();
		addToCart().click();
		viewCart().click();
		cy.findByText(/^qty:/i).should("be.text", "Qty: 24");
    });
    
	it("should show 2 separate items for different sizes", () => {
		cy.visit("http://localhost:3000/details/201123944");
		cy.findByRole("radio", { name: "US 7" }).check({ force: true });
		addToCart().click();
		viewCart().click();
		cy.findByText(/^size:/i).should("be.text", "Size: US 7");
		closeCart().click();
		cy.findByRole("radio", { name: `US 8` }).check({ force: true });
		addToCart().click();
		viewCart().click();
		cy.findAllByText(/^size:/i).should("have.length", 2);
    });
    
	it("should not show an item if its remove button is clicked", () => {
		cy.visit("http://localhost:3000/details/201123944");
		cy.findByRole("radio", { name: "US 7" }).check({ force: true });
		addToCart().click();
		cy.findByRole("radio", { name: "US 7.5" }).check({ force: true });
		addToCart().click();
		cy.findByRole("radio", { name: "US 8" }).check({ force: true });
		addToCart().click();
		viewCart().click();
		cy.findByRole("button", { name: "Remove 1" }).click();
		cy.findAllByText(/^size:/i).should("have.length", 2);
		cy.findByText("Size: US 7.5").should("not.exist");
    });
    
	it("should not change quantities of other sizes when updating quantity of one size", () => {
		cy.visit("http://localhost:3000/details/201123944");
		cy.findByRole("radio", { name: "US 7" }).check({ force: true });
		addToCart().click();
		cy.findByRole("radio", { name: "US 7.5" }).check({ force: true });
		addToCart().click();
		cy.findByRole("radio", { name: "US 8" }).check({ force: true });
		addToCart().click();
		viewCart().click();
		for (let i = 0; i < 3; i++) {
			cy.findByLabelText(`quantity ${i}`).should("have.text", "Qty: 1");
		}
		closeCart().click();
		cy.findByRole("radio", { name: "US 7.5" }).check({ force: true });
		quantityInput().click().type("0");
		addToCart().click();
		viewCart().click();
		for (let j = 0; j < 3; j++) {
			if (j === 1) {
				cy.findByLabelText(`quantity ${j}`).should("have.text", "Qty: 11");
			} else {
				cy.findByLabelText(`quantity ${j}`).should("have.text", "Qty: 1");
			}
		}
    });
    
	it.skip("should correctly calculate product total", () => {
        cy.visit("http://localhost:3000/details/201123944");
        

	});
});
