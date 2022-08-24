const express = require("express");
const session = require("express-session");

const mongoose = require("mongoose");
const Orders = require("../models/ordersModel");

const Router = express.Router();

//returns a users orders
Router.get("/:id", async (req, res) => {
	if (req.session.user) {
		const ordersID = req.params.id;
		try {
			const orders = await Orders.findById(ordersID);
			res.send({ status: 200, payload: orders.items });
		} catch (err) {
			res.status(500).send({ status: err });
		}
	} else {
		res.status(401).send({ status: 401, payload: "User session expired. Please log in." });
	}
});

//deletes an item from an order
Router.put("/:id", async (req, res) => {
	if (req.session.user) {
		const ordersID = req.params.id;
		const { itemId } = req.body;
		try {
			const { items } = await Orders.findById(ordersID);
			const newItems = items.filter((item) => item.id != itemId);
			await Orders.findByIdAndUpdate(ordersID, { items: newItems });
			res.send({ status: 200 });
		} catch (err) {
			res.status(500).send({ status: 500, payload: "Error removing order", err: err });
		}
	} else {
		res.status(401).send({ status: 401, payload: "User session expired. Please log in." });
	}
});

module.exports = Router;
