// Task 11: Marking products as "Low" stock if they have fewer than 20 items left
const Product = require("../model/product");

class InventoryStockLevel {
    async execute(req, res) {
        try {
            const result = await Product.aggregate([
                {
                    $addFields: {
                        stockStatus: {
                            $cond: { if: { $lt: ["$stock", 20] }, then: "Low", else: "Normal" },
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
module.exports = new InventoryStockLevel();
