// Task 10: Adding 18% GST to the base price of each product
const Product = require("../model/product");

class GSTCalculation {
    async execute(req, res) {
        try {
            const result = await Product.aggregate([
                {
                    $addFields: {
                        totalWithGST: { $multiply: ["$price", 1.18] },
                    },
                },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new GSTCalculation();
