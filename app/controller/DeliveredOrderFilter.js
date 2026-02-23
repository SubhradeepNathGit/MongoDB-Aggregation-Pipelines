// Task 14: Filtering the order list to only show those that have been delivered
const Order = require("../model/order");

class DeliveredOrderFilter {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                { $match: { status: "delivered" } }
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new DeliveredOrderFilter();
