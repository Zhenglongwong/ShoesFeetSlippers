import cartReducer from "./cartReducer";

const cartItem1 = {
	name: "shoe1",
	image: "#",
	priceText: "#",
	price: 1,
	quantity: 1,
	size: "US7",
	id: "1111",
};

const cartItem2 = {
	name: "shoe2",
	image: "#",
	priceText: "#",
	price: 1,
	quantity: 1,
	size: "US8",
	id: "2222",
};

describe("CartReducer", () => {
	test("should add items to cart", () => {
		const cart = cartReducer([], { type: "ADD", payload: cartItem1 });
		expect(cart).toEqual([cartItem1]);
	});
	test("should remove items from cart", () => {
		const cart = cartReducer([cartItem1, cartItem2], { type: "REMOVE", payload: cartItem1 });
		expect(cart).toEqual([cartItem2]);
	});
	test("should update quantities of existing items", () => {
		const cart = cartReducer([cartItem1], { type: "ADD", payload: cartItem1 });
		expect(cart).toEqual([{ ...cartItem1, quantity: 2 }]);
	});
	test("should prioritize quantities of client cart when merging", () => {
		const clientCart = [{ ...cartItem1, quantity: 5 }];
		const serverCartItem = { ...cartItem1, quantity: 3 };
		const cart = cartReducer(clientCart, { type: "MERGE", payload: serverCartItem });
		expect(cart).toEqual([{ ...cartItem1, quantity: 5 }]);
	});
	test("should be able to empty cart", () => {
		const cart = cartReducer([cartItem1, cartItem2], { type: "CLEAR", payload: {} });
		expect(cart).toEqual([]);
	});
});
