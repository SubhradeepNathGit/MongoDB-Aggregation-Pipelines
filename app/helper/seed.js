// This helper script used to seed the database with initial test data for all 24 tasks
const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

const users = [
    { _id: 1, name: "Raju", age: 25, city: "Kolkata", status: "active" },
    { _id: 2, name: "Amit", age: 30, city: "Delhi", status: "inactive" },
    { _id: 3, name: "Priya", age: 28, city: "Mumbai", status: "active" },
    { _id: 4, name: "Rahul", age: 35, city: "Kolkata", status: "active" },
    { _id: 5, name: "Sneha", age: 22, city: "Delhi", status: "active" },
];

const products = [
    { _id: 101, name: "Laptop", category: "Electronics", price: 60000, stock: 10 },
    { _id: 102, name: "Mobile", category: "Electronics", price: 20000, stock: 50 },
    { _id: 103, name: "Shoes", category: "Fashion", price: 3000, stock: 100 },
    { _id: 104, name: "Watch", category: "Fashion", price: 5000, stock: 25 },
    { _id: 105, name: "Tablet", category: "Electronics", price: 25000, stock: 15 },
];

const orders = [
    // ── Flat orders (for tasks 3, 5, 14, 15, 16, 18, 20) ──────────────────────
    {
        _id: 1001,
        userId: 1,
        productId: 101,
        quantity: 1,
        totalAmount: 60000,
        status: "delivered",
        orderDate: new Date("2025-01-10"),
    },
    {
        _id: 1002,
        userId: 2,
        productId: 103,
        quantity: 2,
        totalAmount: 6000,
        status: "pending",
        orderDate: new Date("2025-02-15"),
    },
    {
        _id: 1003,
        userId: 3,
        productId: 102,
        quantity: 1,
        totalAmount: 20000,
        status: "delivered",
        orderDate: new Date("2025-03-01"),
    },
    {
        _id: 1004,
        userId: 1,
        productId: 104,
        quantity: 3,
        totalAmount: 15000,
        status: "delivered",
        orderDate: new Date("2025-03-05"),
    },
    {
        _id: 1005,
        userId: 4,
        productId: 105,
        quantity: 1,
        totalAmount: 25000,
        status: "cancelled",
        orderDate: new Date("2025-04-01"),
    },
    //Rich order with embedded items[] (for tasks 17, 19, 22, 23, 24)
    {
        _id: 2001,
        userId: 1,
        city: "Kolkata",
        status: "delivered",
        orderDate: new Date("2025-03-10"),
        totalAmount: 70000,
        items: [
            { productId: 101, category: "Electronics", price: 60000, qty: 1 },
            { productId: 104, category: "Fashion", price: 5000, qty: 2 },
        ],
        payment: { method: "UPI", success: true },
    },
    {
        _id: 2002,
        userId: 3,
        city: "Mumbai",
        status: "delivered",
        orderDate: new Date("2025-04-05"),
        totalAmount: 45000,
        items: [
            { productId: 105, category: "Electronics", price: 25000, qty: 1 },
            { productId: 102, category: "Electronics", price: 20000, qty: 1 },
        ],
        payment: { method: "Card", success: true },
    },
];

const seedDatabase = async (req, res) => {
    try {
        await User.insertMany(users, { ordered: false }).catch(() => { });
        await Product.insertMany(products, { ordered: false }).catch(() => { });
        await Order.insertMany(orders, { ordered: false }).catch(() => { });
        res.status(200).json({ message: "✅ Seed data inserted successfully (duplicates skipped)" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { seedDatabase };
