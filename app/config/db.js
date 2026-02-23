const mongoose = require("mongoose");

const connectionDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongoDB connected");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = connectionDatabase;
