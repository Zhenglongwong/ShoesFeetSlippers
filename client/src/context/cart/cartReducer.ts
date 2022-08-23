import type {ICartItem} from "../../Types";

const cartReducer = (state: ICartItem[] | [], action: { type: string, payload: ICartItem }) => {
	const itemName = action.payload.name;
	const itemSize = action.payload.size;
	const currentCart = [...state];
	const findItemIndex = (
		inCart: boolean,
		cart: ICartItem[],
		itemName: string,
		itemSize: string
	) => {
		if (inCart) {
			let item = cart.find(
				(product: ICartItem) => product.name === itemName && product.size === itemSize
			);
			if (item) {
				return cart.indexOf(item);
			}
		} else {
			return null;
		}
	};
	const itemInCart =
		state.find((product) => product.name === itemName && product.size === itemSize) !== undefined;
	const itemIndex = findItemIndex(itemInCart, currentCart, itemName, itemSize);

	switch (action.type) {
		case "ADD":
			if (itemInCart && itemIndex !== null && itemIndex !== undefined) {
				currentCart[itemIndex].quantity += action.payload.quantity;
				return currentCart;
			} else {
				return currentCart.concat(action.payload);
			}
		case "REMOVE":
			return currentCart.filter((_, index) => index !== itemIndex);
		case "MERGE":
			if (itemInCart && itemIndex !== null && itemIndex !== undefined) {
				return currentCart;
			} else {
				return currentCart.concat(action.payload);
			}
		case "CLEAR":
			return([])
		default:
			return state;
	}
};

export default cartReducer;
