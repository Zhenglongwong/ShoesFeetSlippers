export const login = (email: string, password: string) => {
	cy.findByRole("textbox", { name: "Email" }).type(email);
	cy.findByLabelText("Password").type(password);
	cy.findByRole("button", { name: "Login" }).click();
};

export const signup = (email: string, name: string, password: string) => {
	cy.findByRole("textbox", { name: "Email" }).type(email);
	cy.findByRole("textbox", { name: "Name" }).type(name);
	cy.findByLabelText("Password").type(password);
	cy.findByLabelText("Enter password again").type(password);
	cy.findByRole("button", { name: "Signup" }).click();
};