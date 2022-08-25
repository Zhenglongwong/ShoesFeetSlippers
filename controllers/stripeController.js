const express = require("express");
const session = require("express-session");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Users = require("../models/userModel");
const Cart = require("../models/cartModel");
const Orders = require("../models/ordersModel");

const Router = express.Router();

Router.post("/create-checkout-session", async (req, res) => {
	const items = req.body.map((item) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: `${item.name} ${item.size}`,
			},
			unit_amount: Number(item.price * 100),
		},
		quantity: item.quantity,
	}));
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: items,
			success_url: `${process.env.SERVER_URL}/stripe_redirect`,
			cancel_url: `${process.env.SERVER_URL}/signup`,
		});
		res.send({ url: session.url });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

Router.post("/success", async (req, res) => {
	if (req.session.user) {
		const { email } = req.body;
		try {
			const user = await Users.findOne({ email: email });
			const { cart, orders } = user;
			const { items } = await Cart.findById(cart);
			await Orders.findByIdAndUpdate(orders, { $push: { items: items } });
			await Cart.findByIdAndUpdate(cart, { $set: { items: [] } });
			res.send({ status: 200, payload: user });
		} catch (err) {
			res.send({ status: 500, payload: err });
		}
	} else {
		res.send({ status: 401, payload: "No cookie or email" });
	}
});

module.exports = Router;
