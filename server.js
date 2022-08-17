//DEPENDENCIES
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const userController = require("./controllers/userController");
const cartController = require("./controllers/cartController");

//Mock data
const res0 = require("./client/cypress/fixtures/res0.json");
const res1 = require("./client/cypress/fixtures/res1.json");
const res2 = require("./client/cypress/fixtures/res2.json");
const res3 = require("./client/cypress/fixtures/res3.json");
const det200726394 = require("./client/cypress/fixtures/det200726394.json");
const det201123944 = require("./client/cypress/fixtures/det201123944.json");
const resArr = [res0, res1, res2, res3];

//CONFIG
const app = express();
const PORT = 3001;
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/project4";

mongoose.connection.on("error", (err) => console.log(err.message + " is Mongod not running?"));
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

if (MONGO_URI !== undefined) {
	mongoose.connect(MONGO_URI);
}

mongoose.connection.once("open", () => {
	console.log("connected to mongoose...");
});

//Middleware
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/api/users", userController);
app.use("/api/cart", cartController);

//STRIPE
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.post("/api/create-checkout-session", async (req, res) => {
	const items = req.body.map((item) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: `${item.name} ${item.size}`,
			},
			unit_amount: Number(item.price * 100),
		},
		quantity: item.quantity,
	}));
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: items,
			success_url: `${process.env.SERVER_URL}`,
			cancel_url: `${process.env.SERVER_URL}/signup`,
		});
		res.send({ url: session.url });
	} catch (e) {
		console.log("error", e);
		res.status(500).json({ error: e.message });
	}
});

//MockRoutes
app.get("/api/products/:id", (req, res) => {
	const { id } = req.params;
	res.json(resArr[id]);
});

app.get("/api/details/200726394", (req, res) => {
	res.json(det200726394);
});

app.get("/api/details/201123944", (req, res) => {
	res.json(det201123944);
});

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

//LISTENING
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
