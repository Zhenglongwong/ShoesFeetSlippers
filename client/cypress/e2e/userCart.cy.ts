import { faker } from "@faker-js/faker";
import { login, signup } from "../utils/account.cy";
import { viewCart, closeCart, addToCart } from "../utils/details.cy";

describe("Cart for logged in user", () => {
	const EMAIL = faker.internet.email();
	const NAME = `${faker.word.adjective()} ${faker.word.noun()}`;
	const PASSWORD = faker.word.noun(8);
	const item1Id = "200726394";
	const item2Id = "201123944";
	after(() => {
		cy.visit("http://localhost:3000/delete");
		cy.findByRole("textbox", { name: "Email" }).click().type(EMAIL);
		cy.findByRole("button", { name: "Delete" }).click();
	});

	it("should store changes and retrieve them on login", () => {
		cy.visit("http://localhost:3000/signup");
		//signup & login
		signup(EMAIL, NAME, PASSWORD);
		cy.wait(1500);
		login(EMAIL, PASSWORD);
		cy.wait(500);

		//navigate to a product and add 1 to cart
		cy.findByRole("button", { name: item1Id }).click();
		cy.findByRole("radio", { name: "US 9" }).check({ force: true });
		addToCart().click();
		viewCart().click();
		cy.findAllByText(/^size:/i).should("have.length", 1);
		closeCart().click();

		//navigate to another product and add to cart
		cy.findByRole("link", { name: "Products" }).click();
		cy.findByRole("button", { name: item2Id }).click();
		cy.findByRole("radio", { name: "US 8" }).check({ force: true });
		addToCart().click();
		viewCart().click();
		cy.findAllByText(/^size:/i).should("have.length", 2);
		cy.wait(1000);

		//Logout and check cart is empty
		cy.findByRole("button", { name: "Logout" }).click({ force: true });
		viewCart().click();
		cy.findAllByText(/^size:/i).should("not.exist");

		//Login and check cart is not empty
		cy.findByRole("link", { name: "Login" }).click({ force: true });
		login(EMAIL, PASSWORD);
		viewCart().click();
		cy.findAllByText(/^size:/i).should("have.length", 2);
		cy.wait(2000);

		//Remove first item
		cy.findByRole("button", { name: "Remove 0" }).click({ force: true });
		cy.findAllByText(/^size:/i).should("have.length", 1);
		cy.findByRole("button", { name: "Logout" }).click({ force: true });

		//login and check only 1 item remains
		cy.findByRole("link", { name: "Login" }).click({ force: true });
		login(EMAIL, PASSWORD);
		viewCart().click();
		cy.findAllByText(/^size:/i).should("have.length", 1);
		cy.wait(2000);
	});
});
