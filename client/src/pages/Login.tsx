import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface iValues {
	email: string;
	password: string;
}

const Login = () => {
  const navigate = useNavigate();
	const initialValues = {
		email: "",
		password: "",
  };
  
	const validationSchema = Yup.object({
		email: Yup.string().email("Please enter a valid email").required("Please enter your email"),
		password: Yup.string().required("Please enter your password"),
	});

  //hook?
	const [resStatus, setResStatus] = useState(0);
	const handleSubmit = async (values: iValues): Promise<void> => {
		const { data } = await axios.post("/api/login", values);
		setResStatus(data.data.status);
  };
  
  useEffect(() => {
		if (resStatus === 200) {
			setTimeout(() => {navigate("/")}, 200)
		}
	}, [resStatus, navigate]);

	return (
    <>
      {resStatus === 400 && <h1>Login failed!</h1>}
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          handleSubmit(values)
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
