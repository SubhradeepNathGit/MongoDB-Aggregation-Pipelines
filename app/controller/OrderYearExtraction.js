// Task 9: Extracting the year from each order date for better reporting
const Order = require("../model/order");

class OrderYearExtraction {
    async execute(req, res) {
        try {
            const result = await Order.aggregate([
                {
                    $addFields: {
                        orderYear: { $year: "$orderDate" },
                    },
                },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new OrderYearExtraction();
