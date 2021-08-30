const mongoose = require('mongoose');


const ExpenseSchema = mongoose.Schema({
    expenseType: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Expense', ExpenseSchema);