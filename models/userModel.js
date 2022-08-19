const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
	email: String,
	name: String,
	password: String,
	cart: { type: Schema.Types.ObjectId, ref: "Cart" },
	orders: { type: Schema.Types.ObjectId, ref: "Orders" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
