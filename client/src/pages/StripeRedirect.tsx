import { useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import { useNavigate } from "react-router-dom";

const StripeRedirect = () => {
	const navigate = useNavigate();
	const [, setUser] = useAtom(userAtom);

	const autoLogin = async () => {
		const email = localStorage.getItem("shoesFeatSlippersEmail");
		const { data } = await axios.post("/api/stripe/success", { email });
		if (data) {
			const user = {
				name: data.payload.name,
				email: data.payload.email,
				cartId: data.payload.cart,
				ordersId: data.payload.orders,
			};
			setUser(user);
			navigate("/orders")
        } else {
            alert('Error fetching data. Please login manually.')
        }
	};
    useEffect(() => {
        autoLogin()
    },[])
    

	return <div>stripeRedirect</div>;
};

export default StripeRedirect;
