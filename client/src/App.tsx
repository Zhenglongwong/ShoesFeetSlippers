import { BrowserRouter, Routes, Route } from "react-router-dom";
import { atom } from "jotai";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Delete from "./pages/Delete";
import Orders from "./pages/Orders";
import Product from "./pages/Product/Product";
import StripeRedirect from "./pages/StripeRedirect";
import type { IUser } from "./Types";

export const userAtom = atom<IUser | undefined>(undefined);

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/delete" element={<Delete />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="/stripe_redirect" element={<StripeRedirect />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
