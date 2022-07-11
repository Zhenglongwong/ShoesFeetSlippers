import { faker } from "@faker-js/faker";

describe("Signup", () => {
	const signup = (email: string, name: string, password: string) => {
		cy.findByRole("textbox", { name: "Email" }).type(email);
		cy.findByRole("textbox", { name: "Name" }).type(name);
		cy.findByLabelText("Password").type(password);
		cy.findByLabelText("Password Check").type(password);
		cy.findByRole("button", { name: "Signup" }).click();
	};

	describe("on submit", () => {
		it("should post correct form values", () => {
			cy.intercept("POST", "/api/signup", { fixture: "failure.json" }).as("postSignup");
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
			cy.intercept("POST", "/api/signup", { fixture: "success.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText("Signup successful!").should("not.exist");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText("Signup successful!").should("exist");
		});

		it("should show failure message if signup is unsuccessful", () => {
			cy.intercept("POST", "/api/signup", { fixture: "failure.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText("Signup failed!").should("not.exist");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText("Signup failed!").should("exist");
		});

		it("should redirect to login if successful", () => {
			cy.intercept("POST", "/api/signup", { fixture: "success.json" });
			cy.visit("http://localhost:3000/signup");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.url().should("be.equal", "http://localhost:3000/login");
		});
		it.skip("should show error message if promise is rejected")
	});
});
