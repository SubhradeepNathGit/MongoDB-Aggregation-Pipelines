// Task 15: Finding all orders where the customer bought at least 2 items
const Order = require("../model/order");

class BulkOrderQuantityFilter {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                { $match: { quantity: { $gte: 2 } } }
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new BulkOrderQuantityFilter();
