const { model, Schema } = require('mongoose');

const schema = Schema({
    typeOfRepair: { type: String },
    carOwner: { type: String },
    carRegistration: { type: String },
    priceOfRepair: { type: Number },
    costForRepair: { type: Number },
})

const repairSchema = model('Repair', schema);

module.exports = repairSchema;