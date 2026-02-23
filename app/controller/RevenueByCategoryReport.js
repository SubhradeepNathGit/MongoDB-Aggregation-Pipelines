// Task 17: Generating a revenue breakdown by product category
const Order = require("../model/order");

class RevenueByCategoryReport {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                { $unwind: "$items" },
                {
                    $group: {
                        _id: "$items.category",
                        totalRevenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } },
                    },
                },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new RevenueByCategoryReport();
