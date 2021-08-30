const express = require("express");
const ikubexpenserouter = express.Router();
const IkubExpense = require('../models/ikubexpenses');
const { validateikubexpense } = require('../validation');

ikubexpenserouter.get('/', async (req, res) => {
    try {
        const ikubexpenses = await IkubExpense.find();
        res.json(ikubexpenses)
    }catch(err) {
        res.json({message: err})
    }
});

ikubexpenserouter.get('/:ikubexpenseId', async (req, res) => {
    try {
        const ikubexpense = await IkubExpense.findOne({_id: req.params.ikubexpenseId});
        res.json(ikubexpense)
    }catch(err) {
        res.json({message: err})
    }
});

ikubexpenserouter.get('/users/:userName/ikubs/:ikubName', async (req, res) => {
    try {
        const ikubexpense = await IkubExpense.find({
            userName: req.params.userName,
            ikubName: req.params.ikubName

        });
        console.log(ikubexpense)
        res.json(ikubexpense)
    }catch(err) {
        res.json({message: err})
    }
});


ikubexpenserouter.post('/', async (req, res) => {
    // Check Validation for ikub expenses user
    const { error } = validateikubexpense(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }


    const ikubexpense = new IkubExpense({
        ikubName : req.body.ikubName,
        teamMember : req.body.teamMember,
        interval : req.body.interval,
        amountPerRound : req.body.amountPerRound,
        info : req.body.info,
        beginDate : req.body.beginDate,
        userName : req.body.userName,
        punishmentFee : req.body.punishmentFee,
    });
    try {
    const savedIkubExpense = await ikubexpense.save()
    res.json(savedIkubExpense)
    }catch(err){
    res.json({message: err})
    }

});

ikubexpenserouter.put('/:ikubexpenseId', async (req, res) => {
    // Check Validation for signup user
    const { error } = validateexpense(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const ikubexpense = await IkubExpense.findOne({_id: req.params.ikubexpenseId});

    ikubexpense.ikubName = req.body.ikubName;
    ikubexpense.teamMember = req.body.teamMember;
    ikubexpense.interval = req.body.interval;
    ikubexpense.amountPerRound = req.body.amountPerRound;
    ikubexpense.info = req.body.info;
    ikubexpense.beginDate = req.body.beginDate;
    ikubexpense.userName = req.body.userName;
    ikubexpense.punishmentFee = req.body.punishmentFee;

    try {
    const savedIkubExpense = await ikubexpense.save()
    res.json(savedIkubExpense)
    }catch(err){
    res.json({message: err})
    }

});

ikubexpenserouter.delete('/:ikubexpenseId', async (req, res) => {
    try {
        const ikubexpense = await IkubExpense.remove({_id: req.params.ikubexpenseId});
        res.json(ikubexpense)
    }catch(err) {
        res.json({message: err})
    }
});

module.exports = ikubexpenserouter;