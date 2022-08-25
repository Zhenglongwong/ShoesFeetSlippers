const express = require("express");
const session = require("express-session");
const Cart = require("../models/cartModel");

const Router = express.Router();

//update cart
Router.put("/:id", async (req, res) => {
		const cartID = req.params.id;
		const cart = req.body;
		if (cart) {
			try {
				const newCart = await Cart.findByIdAndUpdate(cartID, {items: cart});
				res.send({ status: 200, payload: newCart });
			} catch (err) {
				res.send({ status: 400, err });
			}
		}
	
});

module.exports = Router;
