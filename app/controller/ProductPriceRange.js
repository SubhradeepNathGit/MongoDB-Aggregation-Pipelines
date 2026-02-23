// Task 1: Fetching products priced between 20,000 and 50,000
const Product = require("../model/product");

class ProductPriceRange {
    async execute(req, res) {
        try {
            const result = await Product.aggregate([
                { $match: { price: { $gt: 20000, $lt: 50000 } } }
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new ProductPriceRange();
