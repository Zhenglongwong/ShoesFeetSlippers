import { BrowserRouter, Routes, Route } from "react-router-dom";
import { atom } from "jotai";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Delete from "./pages/Delete";
import Product from "./pages/Product/Product";
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
			</Routes>
		</BrowserRouter>
	);
}

export default App;
