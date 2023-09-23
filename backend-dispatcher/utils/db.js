const mongoose = require("mongoose");

const connectToDB = async (databaseName) => {
  try {
    const dbUrl = `mongodb://127.0.0.1:27017/${databaseName}`;
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToDB;
