// Task 3: Sorting all orders to show the most recent ones first
const Order = require("../model/order");

class OrderSortByDate {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                { $sort: { orderDate: -1 } }
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new OrderSortByDate();
