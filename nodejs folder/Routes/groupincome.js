const express = require("express");
const groupincomerouter = express.Router();
const GroupIncome = require('../models/groupincomes');
const { validategroupincome } = require('../validation');

groupincomerouter.get('/', async (req, res) => {
    try {
        const groupincomes = await GroupIncome.find();
        res.json(groupincomes)
    }catch(err) {
        res.json({message: err})
    }
});
groupincomerouter.get('/:groupincomeId', async (req, res) => {
    try {
        const groupincome = await GroupIncome.findOne({_id: req.params.groupincomeId});
        res.json(groupincome)
    }catch(err) {
        res.json({message: err})
    }
});
groupincomerouter.post('/', async (req, res) => {
    // Check Validation for groupincomes user
    const { error } = validategroupincome(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const groupincome = new GroupIncome({
        category : req.body.category,
        groupName : req.body.groupName,
        teamMember : req.body.teamMember,
        amount : req.body.amount,
        info : req.body.info,
        date : req.body.date,
        userName : req.body.userName
    });
    try {
    const savedGroupIncome = await groupincome.save()
    res.json(savedGroupIncome)
    }catch(err){
    res.json({message: err})
    }

});

groupincomerouter.put('/:groupincomeId', async (req, res) => {
    // Check Validation for signup user
    const { error } = validateexpense(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const groupincome = await GroupIncome.findOne({_id: req.params.groupincomeId});

    groupincome.category = req.body.category;
    groupincome.groupName = req.body.groupName;
    groupincome.teamMember = req.body.teamMember;
    groupincome.amount = req.body.amount;
    groupincome.info = req.body.info;
    groupincome.date = req.body.date;
    groupincome.userName = req.body.userName;

    try {
    const savedGroupExpense = await groupincome.save()
    res.json(savedGroupExpense)
    }catch(err){
    res.json({message: err})
    }

});

groupincomerouter.delete('/:groupincomeId', async (req, res) => {
    try {
        const groupincome = await GroupIncome.remove({_id: req.params.groupincomeId});
        res.json(groupincome)
    }catch(err) {
        res.json({message: err})
    }
});



module.exports = groupincomerouter;