const express = require("express");
const Cart = require("../models/cartModel");

const Router = express.Router();

//update cart
Router.put("/:id", async (req, res) => {
	const cartID = req.params.id;
	const cart = req.body;
	try {
		const newCart = await Cart.findByIdAndUpdate(cartID, { items: cart });
		res.send({ status: 200 });
	} catch (err) {
		res.status(400).send({ status: 400 });
	}
});

module.exports = Router;
