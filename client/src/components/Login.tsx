import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface values {
	email: string;
	password: string;
}

const Login = () => {
	const initialValues = {
		email: "",
		password: "",
		passwordCheck: "",
	};
	const validationSchema = Yup.object({
		email: Yup.string().email("Please enter a valid email").required("Please enter your email"),
		password: Yup.string().required("Please enter your password"),
	});

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						setSubmitting(false);
					}, 400);
				}}
			>
				{(props) => (
					<Form>
						<label htmlFor="email" className="label">
							Email
						</label>
						<Field
							type="text"
							id="email"
							name="email"
							className="input input-bordered w-full max-w-xs"
						/>
						<ErrorMessage component="p" name="email" />

						<label htmlFor="password" className="label">
							Password
						</label>
						<Field
							type="password"
							id="password"
							name="password"
							className="input input-bordered w-full max-w-xs"
						/>
						<ErrorMessage component="p" name="password" />

						<button className="btn" disabled={!props.isValid}>
							Login
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Login;
