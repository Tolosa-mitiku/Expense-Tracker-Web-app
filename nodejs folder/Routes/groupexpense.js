const express = require("express");
const groupexpenserouter = express.Router();
const GroupExpense = require('../models/groupexpenses');
const { validategroupexpense } = require('../validation');

groupexpenserouter.get('/', async (req, res) => {
    try {
        const groupexpenses = await GroupExpense.find();
        res.json(groupexpenses)
    }catch(err) {
        res.json({message: err})
    }
});

groupexpenserouter.get('/:groupexpenseId', async (req, res) => {
    try {
        const groupexpense = await GroupExpense.findOne({_id: req.params.groupexpenseId});
        res.json(groupexpense)
    }catch(err) {
        res.json({message: err})
    }
});

groupexpenserouter.get('/users/:userName/groups/:groupName', async (req, res) => {
    try {
        const groupexpense = await GroupExpense.find({
            userName: req.params.userName,
            groupName: req.params.groupName

        });
        console.log(groupexpense)
        res.json(groupexpense)
    }catch(err) {
        res.json({message: err})
    }
});

groupexpenserouter.post('/', async (req, res) => {
    // Check Validation for group expenses user
    const { error } = validategroupexpense(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const groupexpense = new GroupExpense({
        category : req.body.category,
        groupName : req.body.groupName,
        teamMember : req.body.teamMember,
        amount : req.body.amount,
        info : req.body.info,
        date : req.body.date,
        userName : req.body.userName
    });
    try {
    const savedGroupExpense = await groupexpense.save()
    res.json(savedGroupExpense)
    }catch(err){
    res.json({message: err})
    }

});

groupexpenserouter.put('/:groupexpenseId', async (req, res) => {
    // Check Validation for signup user
    const { error } = validateexpense(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const groupexpense = await GroupExpense.findOne({_id: req.params.groupexpenseId});

    groupexpense.category = req.body.category;
    groupexpense.groupName = req.body.groupName;
    groupexpense.teamMember = req.body.teamMember;
    groupexpense.amount = req.body.amount;
    groupexpense.info = req.body.info;
    groupexpense.date = req.body.date;
    groupexpense.userName = req.body.userName;

    try {
    const savedGroupExpense = await groupexpense.save()
    res.json(savedGroupExpense)
    }catch(err){
    res.json({message: err})
    }

});

groupexpenserouter.delete('/:groupexpenseId', async (req, res) => {
    try {
        const groupexpense = await GroupExpense.remove({_id: req.params.groupexpenseId});
        res.json(groupexpense)
    }catch(err) {
        res.json({message: err})
    }
});



module.exports = groupexpenserouter;