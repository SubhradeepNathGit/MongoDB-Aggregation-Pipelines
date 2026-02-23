// Task 4: Getting a quick count of our total user base
const User = require("../model/user");

class UserTotalCount {
    async execute(req, res) {
        try {
            const result = await User.aggregate([
                { $count: "totalUsers" }
            ]);
            res.status(200).json(result[0] || { totalUsers: 0 });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new UserTotalCount();
