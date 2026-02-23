// Task 20: Calculating monthly revenue generated during 2025
const Order = require("../model/order");

class MonthlyRevenueAnalytics {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                {
                    $match: {
                        orderDate: {
                            $gte: new Date("2025-01-01"),
                            $lte: new Date("2025-12-31"),
                        },
                    },
                },
                {
                    $group: {
                        _id: { month: { $month: "$orderDate" } },
                        monthlyRevenue: { $sum: "$totalAmount" },
                    },
                },
                { $sort: { "_id.month": 1 } },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new MonthlyRevenueAnalytics();
