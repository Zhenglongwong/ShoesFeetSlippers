import {faker} from "@faker-js/faker";
import {signup} from "./utils/account.cy"

describe("Signup", () => {
	describe("on submit", () => {
		it("should post correct form values", () => {
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/signupSucc.json" }).as("postSignup");
			const EMAIL = faker.internet.email();
			const NAME = faker.word.noun();
			const PASSWORD = faker.word.noun(8);
			cy.visit("http://localhost:3000/signup");
			signup(EMAIL, NAME, PASSWORD);
			cy.wait("@postSignup").get("@postSignup").its("request.body").should("deep.equal", {
				email: EMAIL,
				name: NAME,
				password: PASSWORD,
				passwordCheck: PASSWORD,
			});
		});
	});

	describe("on receiving response", () => {
		it("should show success message if signup is successful", () => {
			//Might delete or change to toast
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/signupSucc.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText("Signup successful!").should("not.exist");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText("Signup successful!").should("exist");
		});

		it("should redirect to login if successful", () => {
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/signupSucc.json" });
			cy.visit("http://localhost:3000/signup");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText("Signup failed. Please try again.").should("not.exist");
			cy.findAllByText("Sorry this account already exists.").should("not.exist");
			cy.url().should("be.equal", "http://localhost:3000/login");
		});

		it("should show failure message if signup unsuccessful", () => {
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/signupFail.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText("Signup failed. Please try again.").should("not.exist");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText("Signup failed. Please try again.").should("exist");
			cy.findAllByText("Sorry this account already exists.").should("not.exist");
			cy.findAllByText("Signup successful!").should("not.exist");
		});

		it("should show error message if account exists", () => {
			cy.intercept("POST", "/api/users/signup", {fixture: "signup/existing.json"});
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText("Sorry this account already exists.").should("not.exist");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText("Sorry this account already exists.").should("exist");
			cy.findAllByText("Signup failed. Please try again.").should("not.exist");
			cy.findAllByText("Signup successful!").should("not.exist");
		})
	});
});
