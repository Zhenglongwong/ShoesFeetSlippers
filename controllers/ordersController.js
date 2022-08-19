const express = require("express");
const Orders = require("../models/ordersModel");

const Router = express.Router();

//update cart
Router.get("/:id", async (req, res) => {
    const ordersID = req.params.id;
    if (ordersID)
	try {
		const orders = await Orders.findById(ordersID);
		res.send({ status: 200, payload: orders.items });
	} catch (err) {
		res.status(400).send({ status: err });
	}
});

module.exports = Router;
