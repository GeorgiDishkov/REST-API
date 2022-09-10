const { model, Schema } = require('mongoose');

const repairSchema = Schema({
    typeOfRepair: { type: String },
    carOwner: { type: String },
    carRegistration: { type: String },
    priceOfRepair: { type: Number },
    costForRepair: { type: Number },
})

repairSchema.index({ carRegistration: 1 }, {
    collation: {
        locale: 'en',
        strength: 1,
    }
})

const Repair = model('Repair', repairSchema);

module.exports = Repair;