const mongoose = require("mongoose");

async function mongoConnect() {
  const { MONGODB_URL } = process.env;
  try {
    const { connection } = await mongoose.connect(MONGODB_URL);
    console.log(`MongoDB connected at ${connection.name}`);
  } catch (error) {
    console.error(`MongoError: ${error.name}`);
  }
}

module.exports = { mongoConnect: mongoConnect };
