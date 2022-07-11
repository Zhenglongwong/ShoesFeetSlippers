import { render, screen } from "@testing-library/react";
import { getByRoleName } from "../utilities";
import ProductCard from "../../pages/components/ProductCard";

describe("Product card", () => {
	describe("user inteface should have", () => {
        test("a name", () => {
            render(
                <ProductCard
                    name={"Nike Air Max Terrascape 90 sneakers in black/dark gray"}
                    image={
                        "images.asos-media.com/products/nike-air-max-terrascape-90-sneakers-in-black-dark-gray/200487519-1-black"
                    }
                    price={"$140.00"}
                    brand={"Nike"}
                    id={1}
                />
            );
			expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Nike Air Max Terrascape 90 sneakers in black/dark gray");
        });
        test("a brand", () => {
            render(
                <ProductCard
                    name={"Nike Air Max Terrascape 90 sneakers in black/dark gray"}
                    image={
                        "images.asos-media.com/products/nike-air-max-terrascape-90-sneakers-in-black-dark-gray/200487519-1-black"
                    }
                    price={"$140.00"}
                    brand={"Nike"}
                    id={1}
                />
            );
			expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("By: Nike");
		});
        test("an image", () => {
            render(
                <ProductCard
                    name={"Nike Air Max Terrascape 90 sneakers in black/dark gray"}
                    image={
                        "images.asos-media.com/products/nike-air-max-terrascape-90-sneakers-in-black-dark-gray/200487519-1-black"
                    }
                    price={"$140.00"}
                    brand={"Nike"}
                    id={1}
                />
            );
			expect(screen.getByRole("img")).toBeInTheDocument();
		});
        test("a price", () => {
            render(
                <ProductCard
                    name={"Nike Air Max Terrascape 90 sneakers in black/dark gray"}
                    image={
                        "images.asos-media.com/products/nike-air-max-terrascape-90-sneakers-in-black-dark-gray/200487519-1-black"
                    }
                    price={"$140.00"}
                    brand={"Nike"}
                    id={1}
                />
            );
			expect(screen.getByText(/^\$\d+(.\d{1,2})?$/)).toHaveTextContent("$140.00")
		});
        test("an add to cart button", () => {
            render(
                <ProductCard
                    name={"Nike Air Max Terrascape 90 sneakers in black/dark gray"}
                    image={
                        "images.asos-media.com/products/nike-air-max-terrascape-90-sneakers-in-black-dark-gray/200487519-1-black"
                    }
                    price={"$140.00"}
                    brand={"Nike"}
                    id={1}
                />
            );
			expect(getByRoleName("button", "Cart")).toBeInTheDocument();
		});
        test("a details button", () => {
            render(
                <ProductCard
                    name={"Nike Air Max Terrascape 90 sneakers in black/dark gray"}
                    image={
                        "images.asos-media.com/products/nike-air-max-terrascape-90-sneakers-in-black-dark-gray/200487519-1-black"
                    }
                    price={"$140.00"}
                    brand={"Nike"}
                    id={1}
                />
            );
			expect(getByRoleName("button", "Details")).toBeInTheDocument();
		});
	});
});
