import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAtom } from "../../App";
import { IOrders} from "../../Types";
import Navbar from "../Navbar";
import OrdersView from "./OrdersView";

const Orders = () => {
	const navigate = useNavigate();
	const [user] = useAtom(userAtom);
	const ordersId = user ? user.ordersId : "";
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	const fetchOrders = async (ordersId: string) => {
		const { data } = await axios.get(`/api/orders/${ordersId}`);
		return data.payload;
	};

	const {
		isLoading,
		error,
		data: orders,
		refetch,
	} = useQuery<IOrders, Error>(["orders"], () => fetchOrders(ordersId));

	const deleteOrder = async (itemId: string) => {
		try {
			await axios.put(`/api/orders/${ordersId}`, { itemId });
			refetch();
		} catch (err: any) {
			toast.error("error deleting order: ", err);
		}
	};

	return (
		<>
			<ToastContainer position="bottom-left" transition={Flip} autoClose={3000} />
			<Navbar />
			{isLoading && <div> Loading orders... </div>}
			{error && <div> Error loading orders... </div>}
			{orders && <OrdersView orders={orders} deleteOrder={deleteOrder} />}
		</>
	);
};

export default Orders;
