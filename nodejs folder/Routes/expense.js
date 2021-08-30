const express = require("express");
const expenserouter = express.Router();
const Expense = require('../models/expenses');
const { validateexpense } = require('../validation');

expenserouter.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses)
    }catch(err) {
        res.json({message: err})
    }
});

expenserouter.get('/:expenseId', async (req, res) => {
    try {
        const expense = await Expense.findOne({_id: req.params.expenseId});
        res.json(expense)
    }catch(err) {
        res.json({message: err})
    }
});
expenserouter.get('/users/:userName', async (req, res) => {
    try {
        const userExpense = await Expense.find({userName: req.params.userName});
        res.json(userExpense)
    }catch(err) {
        res.json({message: err})
    }
});
expenserouter.post('/', async (req, res) => {
    console.log("Am home")
    // Check Validation for signup user
    const { error } = validateexpense(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    const expense = new Expense({
        expenseType: req.body.expenseType,
        userName: req.body.userName,
        category: req.body.category,
        amount: req.body.amount,
        time: req.body.time,
        date: req.body.date
    });
    try {
    const savedExpense = await expense.save()
    res.json(savedExpense)
    }catch(err){
    res.json({message: err})
    }

});

expenserouter.put('/:expenseId', async (req, res) => {
    // Check Validation for signup user
    const { error } = validateexpense(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const expense = await Expense.findOne({_id: req.params.expenseId});

    expense.expenseType = req.body.expenseType;
    expense.userName = req.body.userName;
    expense.category = req.body.category;
    expense.amount = req.body.amount;
    expense.time = req.body.time;
    expense.date = req.body.date;

    try {
    const savedExpense = await expense.save()
    res.json(savedExpense)
    }catch(err){
    res.json({message: err})
    }

});

expenserouter.delete('/:expenseId', async (req, res) => {
    try {
        const expense = await Expense.remove({_id: req.params.expenseId});
        res.json(expense)
    }catch(err) {
        res.json({message: err})
    }
});


module.exports = expenserouter;