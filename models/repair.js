const { model, Schema, Types: { ObjectId } } = require('mongoose');

const repairSchema = Schema({
    typeOfRepair: { type: String },
    carOwner: { type: String },
    carRegistration: { type: String },
    priceOfRepair: { type: Number },
    costForRepair: { type: Number },
    ownderId: { type: ObjectId , ref: 'User'}
})

repairSchema.index({ carRegistration: 1 }, {
    collation: {
        locale: 'en',
        strength: 1,
    }
})

const Repair = model('Repair', repairSchema);

module.exports = Repair;