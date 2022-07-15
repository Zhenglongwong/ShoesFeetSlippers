import { useState } from "react";
import axios from "axios";

const Delete = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const {data} = await axios.post("/api/users/delete", {email: email});
		console.log(data.status, data.payload);
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<label htmlFor="email">
				Email
				<input name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
			</label>
			<button type="submit">Delete</button>
		</form>
	);
};

export default Delete;
