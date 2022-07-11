import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "../../pages/components/Pagination";
import { getByRoleName } from "../utilities";

describe("Pagination (daisyUI)", () => {
	describe("ui", () => {
		test("should have 3 buttons", () => {
			render(<Pagination fetchPage={0} totalPages={3} setFetchPage={()=>{}} />);
			expect(screen.getAllByRole("button")).toHaveLength(3);
		});
		test("should display the current page out of the total pages", () => {
			render(<Pagination fetchPage={0} totalPages={3} setFetchPage={()=>{}}/>);
			expect(screen.getAllByRole("button")[1]).toHaveTextContent("Page 1/3");
		});
	});
	describe("next button", () => {
		test("should increase current page", async () => {
			const user = userEvent.setup();
			render(<Pagination fetchPage={0} totalPages={3} setFetchPage={()=>{}}/>);
			await user.click(getByRoleName("button", "»"));
			expect(screen.getAllByRole("button")[1]).toHaveTextContent("Page 2/3");
		});
		test("should not increase current page if last page", async () => {
			const user = userEvent.setup();
			render(<Pagination fetchPage={2} totalPages={3} setFetchPage={()=>{}}/>);
			await user.click(getByRoleName("button", "»"));
			expect(screen.getAllByRole("button")[1]).toHaveTextContent("Page 3/3");
		});
	});
	describe("prev button", () => {
		test("should decrease current page", async () => {
			const user = userEvent.setup();
			render(<Pagination fetchPage={1} totalPages={3} setFetchPage={()=>{}}/>);
			await user.click(getByRoleName("button", "«"));
			expect(screen.getAllByRole("button")[1]).toHaveTextContent("Page 1/3");
		});
		test("should not decrease current page if first page", async () => {
			const user = userEvent.setup();
			render(<Pagination  fetchPage={0} totalPages={3} setFetchPage={()=>{}}/>);
			await user.click(getByRoleName("button", "«"));
			expect(screen.getAllByRole("button")[1]).toHaveTextContent("Page 1/3");
		});
	});
});
