require('dotenv').config();

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectToDb = async() => {
    await mongoose.connect(MONGO_URI)
      .then(() => {console.log("Successfully connected to MongoDB")})
      .catch((err) => {console.log(err)});
}

module.exports = connectToDb;