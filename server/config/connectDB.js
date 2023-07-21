const mongoose = require("mongoose");
const colors = require("colors")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Mongo Database`.bgMagenta.white)
    } catch (error) {
        console.log(`MONGO Connection Error ${error}`.bgRed.white)
    }
}

module.exports = connectDB;