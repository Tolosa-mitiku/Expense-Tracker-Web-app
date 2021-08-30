const mongoose = require('mongoose');


const GroupIncomeSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    teamMember: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('GroupIncome', GroupIncomeSchema);