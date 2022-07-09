import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
            <Link to="/">Products</Link>
            <Link to="/signup">Signup</Link>
		</>
	);
};

export default Navbar;
