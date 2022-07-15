import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useAtom} from "jotai";
import { useQuery, useQueryClient } from 'react-query'
import { userAtom } from "../App";
import type { IUser, ICartItem, ICartContext } from "../Types";
import { CartContext } from "./context/cart/cartContext";

interface iValues {
	email: string;
	password: string;
}

const Login = () => {
	const [user, setUser] = useAtom(userAtom);
	const { cart, dispatchCart } = useContext(CartContext) as ICartContext;
	const navigate = useNavigate();
	const initialValues = {
		email: "",
		password: "",
	};

 	const queryClient = useQueryClient()
 
	const validationSchema = Yup.object({
		email: Yup.string().email("*Please enter a valid email").required("*Please enter your email"),
		password: Yup.string().required("*Please enter your password"),
	});

	//hook?
	const [resStatus, setResStatus] = useState(0);
	const handleSubmit = async (values: iValues): Promise<void> => {
		const { data } = await axios.post("/api/users/login", values);
		setResStatus(data.status);
		const user = {
			name: data.payload.name,
			email: data.payload.email,
			cartId: data.payload.cart._id,
		} as IUser;
		if (data.status === 200) {
			data.payload.cart.items.map((item: ICartItem) =>
				dispatchCart({ type: "MERGE", payload: item })
			);
			queryClient.invalidateQueries()
			setUser(user);
		} else {
			console.log(data.status, data.payload);
		}
	};

	useEffect(() => {
		if (resStatus === 200) {
			setTimeout(() => {
				navigate("/");
			}, 200);
		}
	}, [resStatus, navigate]);

	return (
		<>
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
							handleSubmit(values);
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
								{resStatus === 403 && (
									<h1 className="text-orange-500">This account does not exist!</h1>
								)}
								{resStatus === 401 && (
									<h1 className="text-orange-500">Incorrect password. Please try again!</h1>
								)}
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Login;
