export interface IProductCard {
	name: string;
	image: string;
	price: number;
	brand: string;
	id: number;
}

export interface ICartItem {
	name: string;
	image: string;
	priceText: string;
	price: number;
	quantity: number;
	size: string;
	id: string;
}

export type ICart = ICartItem[] | [];

export interface IOrdersItems extends ICartItem {
	orderDate: String;
}

export type IOrders = IOrdersItems[] | [];

export interface ICartContext {
	cart: ICart;
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
	ordersId: string;
}
