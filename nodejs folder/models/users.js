const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    AccountNumber: {
        type: Number,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);
