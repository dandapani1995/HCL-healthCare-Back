const mongoose = require('mongoose');
require('dotenv').config();
const configs = require('../config/config');

const connectDb = async ()=>{
    try {
         await mongoose.connect(`${configs.db_url}/${configs.db_name}`);
                 console.log(`Db name : ${configs.db_url}/${configs.db_name}`);
    } catch (error) {
        console.log("DB Connection Failed : "+error);
        throw error;
    }
}

module.exports = connectDb