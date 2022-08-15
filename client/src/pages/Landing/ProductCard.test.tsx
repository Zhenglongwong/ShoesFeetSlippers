import { screen } from "@testing-library/react";
import { getByRoleName, customRender } from "../../tests/utilities";
import ProductCard from "./CardView";

const props = {
	name: "Nike Air Max Terrascape 90 sneakers in black/dark gray",
	image:
		"images.asos-media.com/products/nike-air-max-terrascape-90-sneakers-in-black-dark-gray/200487519-1-black",

	price: 140,
	brand: "Nike",
	id: 1,
};

describe("Product card", () => {
	describe("user inteface should have", () => {
		test("a name", () => {
			customRender(<ProductCard {...props} />);
			expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
				"Nike Air Max Terrascape 90 sneakers in black/dark gray"
			);
		});
		test("a brand", () => {
			customRender(<ProductCard {...props} />);
			expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("By: Nike");
		});
		test("an image", () => {
			customRender(<ProductCard {...props} />);
			expect(screen.getByRole("img")).toBeInTheDocument();
		});
		test("a price", () => {
			customRender(<ProductCard {...props} />);
			expect(screen.getByText(/^\$\d+(.\d{1,2})?$/)).toHaveTextContent("$140.00");
		});
		test("a details button", () => {
			customRender(<ProductCard {...props} />);
			expect(getByRoleName("button", "1")).toBeInTheDocument();
		});
	});
});
