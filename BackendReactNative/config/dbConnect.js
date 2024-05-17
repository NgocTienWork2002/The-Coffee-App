const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(url, {
      dbName: "CoffeeApp",
    });
    console.log("Connect database success");
  } catch (error) {
    console.log("Connect database failed");
  }
};

module.exports = dbConnect;
