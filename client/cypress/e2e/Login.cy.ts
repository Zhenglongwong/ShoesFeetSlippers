import { faker } from "@faker-js/faker";

describe("Signup", () => {
    const login = (email: string, password:string) => {
		cy.findByRole("textbox", { name: "Email" }).type(email);
		cy.findByLabelText("Password").type(password);
		cy.findByRole("button", { name: "Login" }).click();
	};

	describe("on submit", () => {
		it("should post correct form values", () => {
			cy.intercept("POST", "/api/users", { fixture: "failure.json" }).as("postSignup");
            const EMAIL = faker.internet.email();
            const PASSWORD = faker.word.noun(8);
			cy.visit("http://localhost:3000/login");
			login(EMAIL, PASSWORD);
			cy.wait("@postSignup").get("@postSignup").its("request.body").should("deep.equal", {
				email: EMAIL,
				password: PASSWORD,
			});
		});
	});

	describe("on receiving response", () => {
		it("should show failure message if signup is unsuccessful", () => {
			cy.intercept("POST", "/api/users", { fixture: "failure.json" });
			cy.visit("http://localhost:3000/login");
			cy.findAllByText("Login failed!").should("not.exist");
			login(faker.internet.email(), faker.word.noun(8));
			cy.findAllByText("Login failed!").should("exist");
		});

		it("should redirect to login if successful", () => {
			cy.intercept("POST", "/api/users", { fixture: "success.json" });
			cy.visit("http://localhost:3000/login");
			login(faker.internet.email(), faker.word.noun(8));
			cy.url().should("be.equal", "http://localhost:3000/");
		});
	});
});
