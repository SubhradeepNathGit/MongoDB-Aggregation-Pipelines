// Task 22: For each order, only showing sub-items where the quantity is 2 or more
const Order = require("../model/order");

class ItemQuantityDeepFilter {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                {
                    $project: {
                        items: {
                            $filter: {
                                input: "$items",
                                as: "item",
                                cond: { $gte: ["$$item.qty", 2] },
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
module.exports = new ItemQuantityDeepFilter();
