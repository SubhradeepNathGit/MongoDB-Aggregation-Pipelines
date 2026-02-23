// Task 2: Finding users who are between 25 and 30 years old
const User = require("../model/user");

class UserAgeRange {
    async execute(req, res) {
        try {
            const result = await User.aggregate([
                { $match: { age: { $gte: 25, $lte: 30 } } }
            ]);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new UserAgeRange();
