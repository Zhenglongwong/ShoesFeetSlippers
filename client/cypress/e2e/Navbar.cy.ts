import { faker } from "@faker-js/faker";
import {login, signup} from "../utils/account.cy";

describe("Navbar", () => {
	it("links to landing page", () => {
		cy.visit("http://localhost:3000");
		cy.findByRole("link", { name: "Products" }).click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("links to signup", () => {
		cy.visit("http://localhost:3000");
		cy.findByRole("link", { name: "Signup" }).click();
		cy.url().should("eq", "http://localhost:3000/signup");
	});

	it("links to login", () => {
		cy.visit("http://localhost:3000");
		cy.findByRole("link", { name: "Login" }).click();
		cy.url().should("eq", "http://localhost:3000/login");
	});

	it("does shows logout but not links for login or sign up when logged in", () => {
		const EMAIL = faker.internet.email();
		const NAME = `${faker.word.adjective()} ${faker.word.noun()}`;
    const PASSWORD = faker.word.noun(8);
		cy.visit("http://localhost:3000/signup");
    signup(EMAIL, NAME, PASSWORD);
    cy.wait(2000)
    login(EMAIL, PASSWORD);

    cy.findByRole("link", {name: "Signup"}).should('not.exist')
    cy.findByRole("link", {name: "Login"}).should('not.exist')
    cy.findByRole("button", {name: "Logout"}).should('exist')

    //clean up
    cy.visit("http://localhost:3000/delete");
		cy.findByRole("textbox", { name: "Email" }).click().type(EMAIL);
		cy.findByRole("button", { name: "Delete" }).click();
	});
});
