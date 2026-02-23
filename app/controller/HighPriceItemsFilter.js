// Task 12: Filtering out products that are priced over 10,000
const Product = require("../model/product");

class HighPriceItemsFilter {
    async execute(req, res) {
        try {
            const result = await Product.aggregate([
                { $match: { price: { $gt: 10000 } } }
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new HighPriceItemsFilter();
