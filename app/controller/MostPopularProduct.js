// Task 19: Finding the single most popular product based on sales volume
const Order = require("../model/order");

class MostPopularProduct {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                { $unwind: "$items" },
                { $group: { _id: "$items.productId", totalSold: { $sum: "$items.qty" } } },
                { $sort: { totalSold: -1 } },
                { $limit: 1 },
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },
                { $unwind: "$productDetails" },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new MostPopularProduct();
