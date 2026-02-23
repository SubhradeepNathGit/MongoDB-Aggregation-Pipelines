// Task 13: Pulling up a list of all currently active users
const User = require("../model/user");

class ActiveUserFilter {
    async execute(req, res) {
        try {
            const result = await User.aggregate([
                { $match: { status: "active" } }
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new ActiveUserFilter();
