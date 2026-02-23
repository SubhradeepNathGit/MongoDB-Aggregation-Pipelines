const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    userId: { type: Number, required: true },
    productId: { type: Number },
    quantity: { type: Number },
    totalAmount: { type: Number },
    status: { type: String, required: true },
    orderDate: { type: Date, required: true },
    items: [
        {
            productId: { type: Number },
            category: { type: String },
            price: { type: Number },
            qty: { type: Number }
        }
    ],
    payment: {
        method: { type: String },
        success: { type: Boolean }
    },
    city: { type: String }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
