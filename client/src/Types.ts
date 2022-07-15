
export interface IProduct {
	name: string;
	image: string;
	priceText: string;
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