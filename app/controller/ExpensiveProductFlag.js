// Task 8: Flagging products that cost more than 25,000 as "expensive"
const Product = require("../model/product");

class ExpensiveProductFlag {
    async execute(req, res) {
        try {
            const result = await Product.aggregate([
                {
                    $addFields: {
                        isExpensive: { $gt: ["$price", 25000] },
                    },
                },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new ExpensiveProductFlag();
