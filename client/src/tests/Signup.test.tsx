import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../pages/Signup";
import {BrowserRouter as Router} from 'react-router-dom'
import {getByRoleName} from "./utilities"

describe("Signup", () => {
	describe("user interface should have", () => {
		test("email field", () => {
			render(<Router><Signup /></Router>)
			expect(getByRoleName("textbox", "Email")).toBeInTheDocument();
        });
        test("name field", () => {
			render(<Router><Signup /></Router>)
			expect(getByRoleName("textbox", "Name")).toBeInTheDocument();
		});
		test("password field", () => {
			render(<Router><Signup /></Router>);
			expect(screen.getByLabelText("Password")).toBeInTheDocument();
		});
		test("password check field", () => {
			render(<Router><Signup /></Router>);
			expect(screen.getByLabelText("Password Check")).toBeInTheDocument();
		});
		test("signup button", () => {
			render(<Router><Signup /></Router>);
			expect(getByRoleName("button", "Signup")).toBeInTheDocument();
		});
	});

	describe("email field should show error message if", () => {
		test("clicked and empty", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getByRoleName("textbox", "Email"));
			await user.click(screen.getByLabelText("Password"));

			const errorMsg = await screen.findByText("Email is required", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
		test("clicked and not a valid email string", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getByRoleName("textbox", "Email"));
			await user.keyboard("howdy");
			await user.click(screen.getByLabelText("Password"));

			const errorMsg = await screen.findByText("Invalid email address", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
    });
    
    describe("name field should show error message if", () => {
		test("clicked and empty", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getByRoleName("textbox", "Name"));
			await user.click(getByRoleName("textbox", "Email"));

			const errorMsg = await screen.findByText("Name is required", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
        });
        test.todo("clicked and entered string with spaces only")
	});

	describe("password field should show error message if", () => {
		test("clicked and empty", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(screen.getByLabelText("Password"));
			await user.click(getByRoleName("textbox", "Email"));

			const errorMsg = await screen.findByText("Password is required", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
		test("clicked and less than 8 characters", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(screen.getByLabelText("Password"));
			await user.keyboard("1234567");
			await user.click(getByRoleName("textbox", "Email"));

			const errorMsg = await screen.findByText(
				"Password must be at least 8 characters",
				{},
				{ timeout: 50 }
			);
			expect(errorMsg).toBeInTheDocument();
        });
        test.todo("clicked and entered string with spaces only")
	});

	describe("password check field should show error message if", () => {
		test("clicked and empty", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(screen.getByLabelText("Password Check"));
			await user.click(getByRoleName("textbox", "Email"));

			const errorMsg = await screen.findByText(
				"Please enter your password again",
				{},
				{ timeout: 50 }
			);
			expect(errorMsg).toBeInTheDocument();
		});
		test("clicked and not equal to password field", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(screen.getByLabelText("Password"));
			await user.keyboard("123456733");
			await user.click(screen.getByLabelText("Password Check"));
			await user.keyboard("123456344");
			await user.click(screen.getByLabelText("Password"));

			const errorMsg = await screen.findByText("Passwords must match", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
	});

    describe("button", () => {
        test.todo("if any field is empty")
		test("disabled if email field is wrong", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getByRoleName("textbox", "Email"));
			await user.keyboard("asdfasd");

			expect(getByRoleName("button", "Signup")).toBeDisabled();
		});
		test("disabled if password field is wrong", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(screen.getByLabelText("Password"));
			await user.keyboard("123456");
			await user.click(getByRoleName("textbox", "Email"));

			expect(getByRoleName("button", "Signup")).toBeDisabled();
		});
		test("disabled if password check field is wrong", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(screen.getByLabelText("Password"));
			await user.keyboard("123456733");
			await user.click(screen.getByLabelText("Password Check"));
			await user.keyboard("123456344");
			await user.click(screen.getByLabelText("Password"));
			expect(getByRoleName("button", "Signup")).toBeDisabled();
		});
	});
});
