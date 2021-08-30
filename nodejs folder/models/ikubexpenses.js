const mongoose = require('mongoose');


const IkubExpenseSchema = mongoose.Schema({
    ikubName: {
        type: String,
        required: true
    },
    teamMember: {
        type: String,
        required: true
    },
    interval: {
        type: String,
        required: true
    },
    amountPerRound: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    beginDate: {
        type: Date,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    punishmentFee: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('IkubExpense', IkubExpenseSchema);