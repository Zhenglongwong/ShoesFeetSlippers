import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAtom } from "jotai";
import { useQueryClient } from "react-query";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAtom } from "../../App";
import type { ICartItem, ICartContext } from "../../Types";
import { CartContext } from "../../context/cart/cartContext";
import LOGIN_TOASTS from "./TOASTS";

interface ICredentials {
	email: string;
	password: string;
}

const Login = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [, setUser] = useAtom(userAtom);
	const { dispatchCart } = useContext(CartContext) as ICartContext;
	const [responseStatus, setResponseStatus] = useState(0);

	//formik set up
	const initialValues = {
		email: "",
		password: "",
	};
	
	const validationSchema = Yup.object({
		email: Yup.string().email("*Please enter a valid email").required("*Please enter your email"),
		password: Yup.string().required("*Please enter your password"),
	});

	const handleLogin = async (credentials: ICredentials): Promise<void> => {
		const { data } = await axios.post("/api/users/login", credentials);
		if (data) {
			const responseStatus = data.status;
			setResponseStatus(responseStatus);
			if (responseStatus === 200) {
				data.payload.cart.items.map((item: ICartItem) =>
					dispatchCart({ type: "MERGE", payload: item })
				);
				const user = {
					name: data.payload.name,
					email: data.payload.email,
					cartId: data.payload.cart._id,
				};
				setUser(user);
				queryClient.invalidateQueries();
			}
		} else {
			setResponseStatus(503);
		}
	};

	useEffect(() => {
		switch (responseStatus) {
			case 200:
				navigate("/");
				break;
			case 401:
				toast.error(LOGIN_TOASTS.WRONG_PASSWORD);
				break;
			case 403:
				toast.error(LOGIN_TOASTS.NO_ACCOUNT);
				break;
			case 503:
				toast.error(LOGIN_TOASTS.SERVER_ERROR);
		}
	}, [responseStatus, navigate]);

	return (
		<>
			<ToastContainer
				position="bottom-left"
				transition={Flip}
				autoClose={3000} />
			<div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
				<div className="max-w-lg mx-auto">
					<h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
						Start shopping now!
					</h1>

					<p className="max-w-md mx-auto mt-4 text-center text-gray-500">
						Login to your account to enjoy a shopping experience tailored just for you.
					</p>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => {
							handleLogin(values);
							setTimeout(() => {
								setSubmitting(false);
							}, 400);
						}}
					>
						{(props) => (
							<Form className="max-w-md mx-auto mt-8 mb-0 space-y-4">
								<label htmlFor="email" className="label">
									Email
								</label>
								<Field
									type="text"
									id="email"
									name="email"
									placeholder="Enter email"
									className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
								/>
								<ErrorMessage component="p" name="email" className="text-orange-500" />

								<label htmlFor="password" className="label">
									Password
								</label>
								<Field
									type="password"
									id="password"
									name="password"
									placeholder="Enter password"
									className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
								/>
								<ErrorMessage component="p" name="password" className="text-orange-500" />
								<div className="flex items-center justify-between">
									<p className="text-sm text-gray-500">
										No account?&nbsp;
										<Link to="/signup" className="underline">
											Sign up
										</Link>
									</p>

									<button
										disabled={!props.isValid}
										className="btn inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
									>
										Login
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Login;
