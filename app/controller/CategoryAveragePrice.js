// Task 6: Working out the average price of products in each category
const Product = require("../model/product");

class CategoryAveragePrice {
    async execute(req, res) {
        try {
            const result = await Product.aggregate([
                { $group: { _id: "$category", averagePrice: { $avg: "$price" } } },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new CategoryAveragePrice();
