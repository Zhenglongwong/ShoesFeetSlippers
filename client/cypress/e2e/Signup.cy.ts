import { faker } from "@faker-js/faker";
import { signup } from "./utils/account.cy";
import SIGNUP_TOASTS from "../../src/pages/Signup/TOASTS";

describe("Signup", () => {
	describe("on submit", () => {
		it("should post correct form values", () => {
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/signupSucc.json" }).as(
				"postSignup"
			);
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
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/signupSucc.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText(SIGNUP_TOASTS.SUCCESS).should("not.exist");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText(SIGNUP_TOASTS.SUCCESS).should("exist");
			cy.findAllByText(SIGNUP_TOASTS.FAILURE).should("not.exist");
			cy.findAllByText(SIGNUP_TOASTS.EXISTING_ACC).should("not.exist");
			cy.findAllByText(SIGNUP_TOASTS.ERROR).should("not.exist");
		});

		it("should redirect to login if successful", () => {
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/signupSucc.json" });
			cy.visit("http://localhost:3000/signup");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.wait(1000);
			cy.url().should("be.equal", "http://localhost:3000/login");
		});

		it("should show failure message if signup is unsuccessful", () => {
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/signupFail.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText(SIGNUP_TOASTS.FAILURE).should("not.exist");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText(SIGNUP_TOASTS.FAILURE).should("exist");
			cy.findAllByText(SIGNUP_TOASTS.SUCCESS).should("not.exist");
			cy.findAllByText(SIGNUP_TOASTS.EXISTING_ACC).should("not.exist");
			cy.findAllByText(SIGNUP_TOASTS.ERROR).should("not.exist");
		});

		it("should show error message if account exists", () => {
			cy.intercept("POST", "/api/users/signup", { fixture: "signup/existing.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText(SIGNUP_TOASTS.EXISTING_ACC).should("not.exist");
			signup(faker.internet.email(), faker.word.noun(), faker.word.noun(8));
			cy.findAllByText(SIGNUP_TOASTS.EXISTING_ACC).should("exist");
			cy.findAllByText(SIGNUP_TOASTS.FAILURE).should("not.exist");
			cy.findAllByText(SIGNUP_TOASTS.SUCCESS).should("not.exist");
			cy.findAllByText(SIGNUP_TOASTS.ERROR).should("not.exist");
		});
	});
});
