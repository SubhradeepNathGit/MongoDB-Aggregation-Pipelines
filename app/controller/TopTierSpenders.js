// Task 16: Identifying our top 2 biggest spenders in the system
const Order = require("../model/order");

class TopTierSpenders {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                { $group: { _id: "$userId", totalSpent: { $sum: "$totalAmount" } } },
                { $sort: { totalSpent: -1 } },
                { $limit: 2 },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "userDetails",
                    },
                },
                { $unwind: "$userDetails" },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new TopTierSpenders();
