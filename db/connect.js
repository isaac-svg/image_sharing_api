const mongoose = require("mongoose");

async function connectDB() {
  try {
    // console.log("first");
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to db`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
