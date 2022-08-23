const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = Schema(
	{
		items: [
			{
				name: String,
				image: String,
				priceText: String,
				price: Number,
				quantity: Number,
				size: String,
				productId: String,
				orderDate: {type: String, default: new Date()}
			},
		],
	}
);

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
