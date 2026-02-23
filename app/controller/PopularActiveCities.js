// Task 21: Finding the city with the largest number of active users
const User = require("../model/user");

class PopularActiveCities {
    async execute(req, res) {
        try {
            const result = await User.aggregate([
                { $match: { status: "active" } },
                { $group: { _id: "$city", activeUserCount: { $sum: 1 } } },
                { $sort: { activeUserCount: -1 } },
                { $limit: 1 },
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new PopularActiveCities();
