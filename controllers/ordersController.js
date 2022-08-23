const express = require("express");
const Orders = require("../models/ordersModel");

const Router = express.Router();

//returns a users cart
Router.get("/:id", async (req, res) => {
	const ordersID = req.params.id;
	try {
		const orders = await Orders.findById(ordersID);
		res.send({ status: 200, payload: orders.items });
	} catch (err) {
		res.status(400).send({ status: err });
	}
});

//deletes an item from an order
Router.delete("/:id", async (req, res) => {
	const ordersID = req.params.id;
	const { itemID } = req.body;
	try {
		const { items } = await Orders.findById(ordersID);
		const newItems = items.filter((item) => item._id !== itemID);
		await Orders.findByIdAndUpdate(ordersID, { items: newItems });
		res.send({ status: 200, payload: newItems });
	} catch (err) {
		res.send({ status: 400, payload: "Error removing order" });
	}
});

module.exports = Router;
