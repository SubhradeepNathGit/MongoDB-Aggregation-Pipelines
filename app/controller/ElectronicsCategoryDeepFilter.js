// Task 23: Filtering embedded items to only include Electronics in each order
const Order = require("../model/order");

class ElectronicsCategoryDeepFilter {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                {
                    $project: {
                        items: {
                            $filter: {
                                input: "$items",
                                as: "item",
                                cond: { $eq: ["$$item.category", "Electronics"] },
                            },
                        },
                    },
                },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new ElectronicsCategoryDeepFilter();
