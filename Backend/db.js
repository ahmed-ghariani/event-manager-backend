const mongoose = require("mongoose");

module.exports = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/event-manager');
        console.log('connected to MongoDb');
    }catch (err){
        console.error(err);
        process.exit(1);
    }
}