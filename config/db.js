require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected.");
    } catch (err) {
        console.error("Database Connection Failed:", err.message);
    }
}

module.exports = connectDB;