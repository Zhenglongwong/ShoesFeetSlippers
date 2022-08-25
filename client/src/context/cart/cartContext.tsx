import { useEffect, createContext, useReducer, PropsWithChildren, FC, useMemo } from "react";
import cartReducer from "./cartReducer";
import type { ICartContext, IUser, ICart } from "../../Types";
import { useAtom } from "jotai";
import { userAtom } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext<ICartContext | null>(null);

const CartContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user] = useAtom(userAtom);
	const [cart, dispatchCart] = useReducer(cartReducer, []);

	const syncCart = async (cart: ICart, user: IUser) => {
		try {
			await axios.put(`/api/cart/${user.ordersId}`, cart);
		} catch (err: any) {
			toast.error(err);
		}
	};

	useEffect(() => {
		if (user) {
			syncCart(cart, user);
		}
	}, [cart, user]);

	const cartTotal = useMemo(
		() => cart.reduce((prevItem, currItem) => prevItem + currItem.price * currItem.quantity, 0),
		[cart]
	);

	return (
		<CartContext.Provider value={{ cart, dispatchCart, cartTotal }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
