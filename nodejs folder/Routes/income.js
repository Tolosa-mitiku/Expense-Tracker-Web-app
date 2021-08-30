const express = require("express");
const incomerouter = express.Router();
const Income = require('../models/incomes');
const { validateincome } = require('../validation');

incomerouter.get('/', async (req, res) => {
    try {
        const incomes = await Income.find();
        res.json(incomes)
    }catch(err) {
        res.json({message: err})
    }
});

incomerouter.get('/:incomeId', async (req, res) => {
    try {
        const income = await Income.findOne({_id: req.params.incomeId});
        res.json(income)
    }catch(err) {
        res.json({message: err})
    }
});

incomerouter.get('/users/:userName', async (req, res) => {
    try {

        const userIncome = await Income.find({userName: req.params.userName});
        console.log(userIncome)
        res.json(userIncome)
    }catch(err) {
        res.json({message: err})
    }
});

incomerouter.post('/', async (req, res) => {
    // Check Validation for incomes user
    const { error } = validateincome(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const income = new Income({
        incomeType: req.body.incomeType,
        userName: req.body.userName,
        category: req.body.category,
        amount: req.body.amount,
        time: req.body.time,
        date: req.body.date
    });
    try {
    const savedIncome = await income.save()
    res.json(savedIncome)
    }catch(err){
    res.json({message: err})
    }

});

incomerouter.put('/:incomeId', async (req, res) => {
    // Check Validation for signup user
    const { error } = validateexpense(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const expense = await Expense.findOne({_id: req.params.incomeId});

    income.incomeType = req.body.incomeType;
    income.userName = req.body.userName;
    income.category = req.body.category;
    income.amount = req.body.amount;
    income.time = req.body.time;
    income.date = req.body.date;

    try {
    const saveIncome = await income.save()
    res.json(savedIncome)
    }catch(err){
    res.json({message: err})
    }

});

incomerouter.delete('/:incomeId', async (req, res) => {
    try {
        const income = await Income.remove({_id: req.params.incomeId});
        res.json(income)
    }catch(err) {
        res.json({message: err})
    }
});


module.exports = incomerouter;