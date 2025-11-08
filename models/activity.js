const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    sleep: Number,
    steps: Number,
    water: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);