import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface values {
	email: string;
	password: string;
	passwordCheck: string;
}

const Signup = () => {
	const navigate = useNavigate();
	const initialValues = {
    email: "",
    name: "",
		password: "",
		passwordCheck: "",
	};

	const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    name: Yup.string().required("Name is required"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters"),
		passwordCheck: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required("Please enter your password again"),
	});

	const [resStatus, setResStatus] = useState(0);
	const handleSubmit = async (values: values): Promise<void> => {
		const { data } = await axios.post("/api/users", values);
		setResStatus(data.data.status);
	};

	useEffect(() => {
		if (resStatus === 200) {
			setTimeout(() => {navigate("/login")}, 200)
		}
	}, [resStatus, navigate]);

	return (
		<>
			{resStatus === 200 && <h1>Signup successful!</h1>}
			{resStatus === 400 && <h1>Signup failed!</h1>}
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
					<Form>
						<label htmlFor="Email" className="label">
							Email
						</label>
						<Field
							type="text"
							id="Email"
							name="email"
							className="input input-bordered w-full max-w-xs"
						/>
            <ErrorMessage component="p" name="email" />
            <label htmlFor="Name" className="label">
							Name
						</label>
						<Field
							type="text"
							id="Name"
							name="name"
							className="input input-bordered w-full max-w-xs"
						/>
						<ErrorMessage component="p" name="name" />

						<label htmlFor="Password" className="label">
							Password
						</label>
						<Field
							type="password"
							id="Password"
							name="password"
							className="input input-bordered w-full max-w-xs"
						/>
						<ErrorMessage component="p" name="password" />

						<label htmlFor="PasswordCheck" className="label">
							Password Check
						</label>
						<Field
							type="password"
							id="PasswordCheck"
							name="passwordCheck"
							className="input input-bordered w-full max-w-xs"
						/>
						<ErrorMessage component="p" name="passwordCheck" />

						<button className="btn" disabled={!props.isValid}>
							Signup
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Signup;