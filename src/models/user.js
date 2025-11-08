const mongoose = require('mongoose');
const Role = require('./role');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    dob: Date,
    phone: String,
    problem: String,
    height: String,
    weight: String,
    bloodGroup:String,
    dietHabits: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    }
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);