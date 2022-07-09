import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";
import { getByRoleName } from "./utilities";
import { faker } from "@faker-js/faker";

describe("Login", () => {
	describe("user interface should have", () => {
		test("email field", () => {
			render(<Login />);
			expect(getByRoleName("textbox", "Email")).toBeInTheDocument();
		});
		test("password field", () => {
			render(<Login />);
			expect(screen.getByLabelText("Password")).toBeInTheDocument();
		});
		test("login button", () => {
			render(<Login />);
			expect(getByRoleName("button", "Login")).toBeInTheDocument();
		});
	});
	describe("email field should show error message if", () => {
		test("clicked and empty", async () => {
			const user = userEvent.setup();
			render(<Login />);

			await user.click(getByRoleName("textbox", "Email"));
			await user.click(screen.getByLabelText("Password"));

			const errorMsg = await screen.findByText("Please enter your email", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
		test("clicked and not a valid email", async () => {
			const user = userEvent.setup();
			render(<Login />);

			await user.click(getByRoleName("textbox", "Email"));
			await user.keyboard("asdfasdf");
			await user.click(screen.getByLabelText("Password"));

			const errorMsg = await screen.findByText("Please enter a valid email", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
	});
	describe("password field should show an error if", () => {
		test("clicked and empty", async () => {
			const user = userEvent.setup();
			render(<Login />);

			await user.click(screen.getByLabelText("Password"));
			await user.click(getByRoleName("textbox", "Email"));

			const errorMsg = await screen.findByText("Please enter your password", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
	});

	describe("login button should be disabled if", () => {
		test("disabled if email field is empty", async () => {
			const user = userEvent.setup();
			render(<Login />);

			await user.click(screen.getByLabelText("Password"));
			await user.keyboard("asdfasdf");

			expect(getByRoleName("button", "Login")).toBeDisabled();
        });
        test("disabled if email field is wrong", async () => {
			const user = userEvent.setup();
			render(<Login />);

			await user.click(getByRoleName("textbox", "Email"));
			await user.keyboard(faker.word.noun());

			expect(getByRoleName("button", "Login")).toBeDisabled();
		});
		test("disabled if password field is empty", async () => {
			const user = userEvent.setup();
			render(<Login />);

			await user.click(getByRoleName("textbox", "Email"));
			await user.keyboard(faker.internet.email());

			expect(getByRoleName("button", "Login")).toBeDisabled();
        });
        
	});
});
