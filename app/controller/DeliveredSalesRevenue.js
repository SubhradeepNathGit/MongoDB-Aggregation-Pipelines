// Task 5: Calculating total revenue specifically from delivered orders
const Order = require("../model/order");

class DeliveredSalesRevenue {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                { $match: { status: "delivered" } },
                { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
            ]);
            res.status(200).json(result[0] || { totalRevenue: 0 });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new DeliveredSalesRevenue();
