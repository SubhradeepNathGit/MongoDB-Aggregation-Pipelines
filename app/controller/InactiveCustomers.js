// Task 18: Finding users who haven't placed an order yet
const User = require("../model/user");

class InactiveCustomers {
    async execute(req, res) {
        try {
            const result = await User.aggregate([
                {
                    $lookup: {
                        from: "orders",
                        localField: "_id",
                        foreignField: "userId",
                        as: "userOrders",
                    },
                },
                { $match: { userOrders: { $size: 0 } } },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new InactiveCustomers();
