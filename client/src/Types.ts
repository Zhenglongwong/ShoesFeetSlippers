
//to create a product card
export interface ICard {
	name: string;
	image: string;
	price: number;
	brand: string;
	id: number;
}

//for all cart related actions
export interface ICartItem {
	name: string;
	image: string;
	priceText: string;
	price: number;
	quantity: number;
	size: string;
	id: string;
}

export interface ICartContext {
	cart: ICartItem[] | [];
	cartTotal: number;
	dispatchCart: React.Dispatch<{
		payload: ICartItem;
		type: string;
	}>;
}

export interface IUser {
	name: string;
	email: string;
	cartId: string;
}
