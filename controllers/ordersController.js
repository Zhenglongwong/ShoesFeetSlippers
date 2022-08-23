const express = require("express");
const mongoose = require("mongoose");
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
Router.put("/:id", async (req, res) => {
	const ordersID = req.params.id;
	const { itemId } = req.body;
	// const id = mongoose.Types.ObjectId(itemId);
	try {
		const { items } = await Orders.findById(ordersID);
		const newItems = items.filter((item) => item.id != itemId )
		await Orders.findByIdAndUpdate(ordersID, { items: newItems });
		res.send({ status: 200 });
	} catch (err) {
		res.send({ status: 400, payload: "Error removing order", err: err });
	}
});

module.exports = Router;
