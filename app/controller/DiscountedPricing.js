// Task 7: Applying a 10% discount across all products
const Product = require("../model/product");

class DiscountedPricing {
    async execute(req, res) {
        try {
            const result = await Product.aggregate([
                {
                    $addFields: {
                        discountedPrice: { $multiply: ["$price", 0.9] },
                    },
                },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new DiscountedPricing();
