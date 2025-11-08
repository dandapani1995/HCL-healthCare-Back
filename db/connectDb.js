const mongoose = require('mongoose');

require('dotenv').config();
const configs = require('../configs/dev');

const connectDb = async ()=>{
    try {
        console.log(configs)
        console.log(`DB connecting to ${configs.db_url} - ${configs.db_name}`)
        const dbInstance = await mongoose.connect(`${configs.db_url}/${configs.db_name}`);
        console.log(`DB connected to ${configs.db_url} - ${configs.db_name}`)
    } catch (error) {
        console.log("DB Connection Failed : "+error);
        throw error;
    }
}

module.exports = connectDb