const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const Cart = require("../models/cartModel");
const Orders = require("../models/ordersModel");

const Router = express.Router();
const salt = bcrypt.genSaltSync(9);

//Create new user
Router.post("/signup", async (req, res) => {
	const { email, name } = req.body;
	const password = await bcrypt.hash(req.body.password, salt);
	const existingUser = await Users.findOne({ email: email });

	if (existingUser) {
		//already signed up
		res.send({ status: 409 });
	} else {
		try {
			const { _id: cart_id } = await Cart.create({});
			const { _id: orders_id } = await Orders.create({});
			const newUser = await Users.create({
				email: email,
				name: name,
				password: password,
				cart: cart_id,
				orders: orders_id,
			});
			res.send({ status: 200, payload: newUser });
		} catch (err) {
			res.send({ status: 500, payload: err.message });
		}
	}
});

//Login existing user
Router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const existingUser = await Users.findOne({ email: email }).populate("cart");

	if (!existingUser) {
		//not signed up
		res.send({ status: 403, payload: "Not existing user" });
	} else if (bcrypt.compareSync(password, existingUser.password)) {
		//login success
		req.session.user = existingUser;
		res.send({ status: 200, payload: existingUser });
	} else {
		//incorrect password
		res.send({ status: 401, payload: "Incorrect password" });
	}
});

//Logout
Router.get("/logout", async (req, res) => {
	if (!req.session.user) {
		res.send({ status: 401, payload: "Not logged in" });
	} else {
		try {
			req.session.destroy(session);
			res.send({ status: 200 });
		} catch (error) {
			res.send({ status: 500, payload: "Error logging out" });
		}
	}
});

Router.post("/delete", async (req, res) => {
	const { email } = req.body;
	const existingUser = await Users.findOne({ email: email });
	if (existingUser) {
		try {
			await Users.deleteOne({ email: email });
			await Cart.deleteOne({ _id: existingUser.cart });
			await Orders.deleteOne({ _id: existingUser.orders });
			res.send({ status: 200 });
		} catch (error) {
			res.send({ status: 404, payload: error.message });
		}
	} else {
		res.send({ status: 403, payload: "User does not exist" });
	}
});

module.exports = Router;
