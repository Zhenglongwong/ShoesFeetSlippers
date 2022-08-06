import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SIGNUP_TOASTS from "./TOASTS";

interface ICredentials {
	email: string;
	password: string;
	passwordCheck: string;
}

const Signup = () => {
	const navigate = useNavigate();
	const [responseStatus, setResponseStatus] = useState(0);

	//formik set up
	const initialValues = {
		email: "",
		name: "",
		password: "",
		passwordCheck: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("*Invalid email address").required("*Email is required"),
		name: Yup.string().required("*Name is required"),
		password: Yup.string()
			.required("*Password is required")
			.min(8, "*Password must be at least 8 characters"),
		passwordCheck: Yup.string()
			.oneOf([Yup.ref("password")], "*Passwords must match")
			.required("*Please enter your password again"),
	});

	const handleSubmit = async (credentials: ICredentials): Promise<void> => {
		const { data } = await axios.post("/api/users/signup", credentials);
		if (data) {
			setResponseStatus(data.status);
		} else {
			setResponseStatus(500);
		}
	};

	useEffect(() => {
		switch (responseStatus) {
			case 200:
				toast.success(SIGNUP_TOASTS.SUCCESS);
				setTimeout(() => {
					navigate("/login");
				}, 1000);
				break;
			case 400:
				toast.error(SIGNUP_TOASTS.FAILURE);
				break;
			case 409:
				toast.error(SIGNUP_TOASTS.EXISTING_ACC);
				break;
			case 500:
				toast.error(SIGNUP_TOASTS.ERROR);
				break;
		}
	}, [responseStatus, navigate]);

	return (
		<>
			<ToastContainer
				position="bottom-left"
				transition={Flip}
				autoClose={3000} />
			<div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
				<div className="max-w-lg mx-auto text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">Create an account!</h1>

					<p className="mt-4 text-gray-500">
						Join us to enjoy exclusive offers and deals. Your journey to perfect foot fasion is
						about to begin!
					</p>
				</div>
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
							<label htmlFor="Email" className="label">
								Email
							</label>
							<Field
								type="text"
								id="Email"
								name="email"
								placeholder="Email"
								className=" input w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
							/>
							<ErrorMessage component="p" name="email" className="text-orange-500" />
							<label htmlFor="Name" className="label">
								Name
							</label>
							<Field
								type="text"
								id="Name"
								name="name"
								placeholder="Name"
								className="input w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
							/>
							<ErrorMessage component="p" name="name" className="text-orange-500" />

							<label htmlFor="Password" className="label">
								Password
							</label>
							<Field
								type="password"
								id="Password"
								name="password"
								placeholder="Password"
								className="input w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
							/>
							<ErrorMessage component="p" name="password" className="text-orange-500" />

							<label htmlFor="PasswordCheck" className="label">
								Enter password again
							</label>
							<Field
								type="password"
								id="PasswordCheck"
								name="passwordCheck"
								placeholder="Enter password again"
								className="input w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
							/>
							<ErrorMessage component="p" name="passwordCheck" className="text-orange-500" />
							<div className="flex items-center justify-between">
								<p className="text-sm text-gray-500">
									Already have an acount?&nbsp;
									<Link to="/login" className="underline">
										Login here
									</Link>
								</p>

								<button
									type="submit"
									disabled={!props.isValid}
									className="btn inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
								>
									Signup
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default Signup;
