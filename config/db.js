const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ambrishjeyan023_db_user:JEAesFUk4OGajftE@cluster0.nods8hr.mongodb.net/expense_tracker?retryWrites=true&w=majority"
    );
    console.log("MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};

module.exports = connectDB;
