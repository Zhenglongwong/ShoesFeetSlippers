const express = require("express");
const session = require("express-session");
const Cart = require("../models/cartModel");

const Router = express.Router();

//update cart
Router.put("/:id", async (req, res) => {
	if (req.session.user) {
		const cartID = req.params.id;
		const cart = req.body;
		if (cart) {
			try {
				await Cart.findByIdAndUpdate(cartID, { items: cart });
				res.send({ status: 200 });
			} catch (err) {
				res.status(400).send({ status: 400, err });
			}
		}
	} else {
		res.status(401).send({ status: 401, payload: "User session expired. Please log in." })
	}
	
});

module.exports = Router;
