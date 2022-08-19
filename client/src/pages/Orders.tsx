import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import axios from "axios";
import { userAtom } from "../App";
import { ICart, IUser } from "../Types";
import Navbar from "./Navbar";

const Orders = () => {
	const navigate = useNavigate();
	const [user] = useAtom(userAtom);
	const { ordersId } = user as IUser;
	const fetchOrders = async (ordersId: string) => {
		const { data } = await axios.get(`/api/orders/${ordersId}`);
		return data.payload;
	};
	const {
		isLoading,
		error,
		data: orders,
	} = useQuery<ICart, Error>(["orders"], () => fetchOrders(ordersId));

	if (!user) {
		navigate("/login");
	}

	if (isLoading) {
		return (
			<>
				<Navbar />
				<div> Loading orders... </div>
			</>
		);
	}

	if (error || !orders) {
		return (
			<>
				<div> Error loading errors... </div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<h2> ORDERS</h2>
			{orders ? (
				orders.map((order) => (
					<div>
						{order.name} || {order.quantity} || {order.size}
					</div>
				))
			) : (
				<div> Error loading errors... </div>
			)}
		</>
	);
};

export default Orders;
