const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema({
	items: [
		{
			name: String,
			image: String,
			priceText: String,
			price: Number,
			quantity: Number,
			size: String,
			productId: String,
		},
	],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
