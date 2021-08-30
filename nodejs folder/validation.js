const Joi = require('@hapi/joi');


const validatesignup = (data) => {
    const schema = Joi.object({
        accountNumber: Joi.number().integer().required(),
        userName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const validatelogin = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}
const validateincome = (data) => {
    const schema = Joi.object({
        incomeType: Joi.string().min(6).required(),
        userName: Joi.string().min(6).required(),
        category: Joi.string().min(6).required(),
        amount: Joi.number().min(6).required(),
        time: Joi.string().min(3).required(),
        date: Joi.string().min(6).required()
    })
    return schema.validate(data);
}
const validateexpense = (data) => {
    const schema = Joi.object({
        expenseType: Joi.string().min(6).required(),
        userName: Joi.string().min(6).required(),
        category: Joi.string().min(6).required(),
        amount: Joi.number().min(6).required(),
        time: Joi.string().min(3).required(),
        date: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const validategroupexpense = (data) => {
    const schema = Joi.object({
        category: Joi.string().min(3).required(),
        groupName: Joi.string().min(3).required(),
        teamMember: Joi.string().min(3).required(),
        info: Joi.string().min(3).required(),
        date: Joi.string().min(3).required(),
        userName: Joi.string().min(3).required()
    })
    return schema.validate(data);
}
const validategroupincome = (data) => {
    const schema = Joi.object({
        category: Joi.string().min(6).required(),
        groupName: Joi.string().min(6).required(),
        teamMember: Joi.string().min(6).required(),
        info: Joi.string().min(6).required(),
        date: Joi.string().min(6).required(),
        userName: Joi.string().min(6).required()
    })
    return schema.validate(data);
}
const validateikubexpense = (data) => {
    const schema = Joi.object({
        interval: Joi.number().min(6).required(),
        ikubName: Joi.string().min(6).required(),
        teamMember: Joi.string().min(6).required(),
        amountPerRound: Joi.number().min(6).required(),
        info: Joi.string().min(6).required(),
        beginDate: Joi.string().min(6).required(),
        userName: Joi.string().min(6).required(),
        punishmentFee: Joi.number().min(6).required()
        
    })
    return schema.validate(data);
}


module.exports.validatesignup = validatesignup;
module.exports.validatelogin = validatelogin;
module.exports.validateexpense = validateexpense;
module.exports.validateincome = validateincome;
module.exports.validategroupexpense = validategroupexpense;
module.exports.validategroupincome = validategroupincome;
module.exports.validateikubexpense = validateikubexpense;