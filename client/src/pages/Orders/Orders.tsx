import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import axios from "axios";
import { userAtom } from "../../App";
import { IOrders, IUser } from "../../Types";
import Navbar from "../Navbar";
import OrdersView from "./OrdersView";

const Orders = () => {
	const navigate = useNavigate();
	const [user] = useAtom(userAtom);
	const { ordersId } = user as IUser;
	const fetchOrders = async (ordersId: string) => {
		const { data } = await axios.get(`/api/orders/${ordersId}`);
		return data.payload;
	};
	const deleteOrder = async (ordersId: string, itemId: string) => {
		const {data} = await axios.delete(`/api/orders/${ordersId}`)
	};

	const {
		isLoading,
		error,
		data: orders,
	} = useQuery<IOrders, Error>(["orders"], () => fetchOrders(ordersId));

	if (!user) {
		navigate("/login");
	}

	return (
		<>
			<Navbar />
			{isLoading && <div> Loading orders... </div>}
			{error && <div> Error loading orders... </div>}
			{orders && <OrdersView orders={orders} />}
		</>
	);
};

export default Orders;
