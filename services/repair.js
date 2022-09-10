const Repair = require('../models/repair');

async function getAll() {
    const data = await Repair.find({});
    return data;
}

function getById(id) {
    return Repair.findById(id);
}

async function create(repairInfo) {
    const result = new Repair(repairInfo);
    await result.save();

    return result;
}

async function update(id, repair) {
    const existing = await Repair.findById(id);

    existing.typeOfRepair = data.typeOfRepair;
    existing.carOwner = data.carOwner;
    existing.carRegistration = data.carRegistration;
    existing.priceOfRepair = data.priceOfRepair;
    existing.costForRepair = data.costForRepair;

    await existing.save();

    return existing;
}

async function dell(id) {
    await Repair.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    dell
}