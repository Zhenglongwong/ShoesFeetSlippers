import { faker } from "@faker-js/faker";
import { login } from "./utils/account.cy";
import LOGIN_TOASTS from "../../src/pages/Login/TOASTS";

describe("Login", () => {
	describe("on submit", () => {
		it("should post correct form values", () => {
			cy.intercept("POST", "/api/users/login", { fixture: "login/success.json" }).as("postLogin");
			const EMAIL = faker.internet.email();
			const PASSWORD = faker.word.noun(8);
			cy.visit("http://localhost:3000/login");
			login(EMAIL, PASSWORD);
			cy.wait("@postLogin").get("@postLogin").its("request.body").should("deep.equal", {
				email: EMAIL,
				password: PASSWORD,
			});
		});
	});

	describe("on receiving response", () => {
		it("should redirect to landing if successful", () => {
			cy.intercept("POST", "/api/users/login", { fixture: "login/success.json" });
			cy.intercept("PUT", "/api/cart/1", { fixture: "login/success.json" });
			cy.visit("http://localhost:3000/login");
			login(faker.internet.email(), faker.word.noun(8));
			cy.url().should("be.equal", "http://localhost:3000/");
		});
		it("should notify if password is incorrect", () => {
			cy.intercept("POST", "/api/users/login", { fixture: "login/wrongpw.json" });
			cy.visit("http://localhost:3000/login");
			cy.findAllByText(LOGIN_TOASTS.WRONG_PASSWORD).should("not.exist");
			login(faker.internet.email(), faker.word.noun(8));
			cy.findAllByText(LOGIN_TOASTS.WRONG_PASSWORD).should("exist");
		});
		it("should notify if account does not exist", () => {
			cy.intercept("POST", "/api/users/login", { fixture: "login/noAccount.json" });
			cy.visit("http://localhost:3000/login");
			cy.findAllByText(LOGIN_TOASTS.NO_ACCOUNT).should("not.exist");
			login(faker.internet.email(), faker.word.noun(8));
			cy.findAllByText(LOGIN_TOASTS.NO_ACCOUNT).should("exist");
		});
	});
});
