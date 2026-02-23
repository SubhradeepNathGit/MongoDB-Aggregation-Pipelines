// Task 24: Adding a list of items that cost more than 20,000 to each order
const Order = require("../model/order");

class HighValueItemFlag {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                {
                    $addFields: {
                        highValueItems: {
                            $filter: {
                                input: "$items",
                                as: "item",
                                cond: { $gt: ["$$item.price", 20000] },
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
module.exports = new HighValueItemFlag();
