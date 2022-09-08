const Repair = require('../models/repair');

async function getAll() {
    const data = await Repair.find({});
    return data;
}

async function getById(id) {
    const result = await Repair.findById(id);
    return result;
}

async function create(repairInfo) {
    const result = new Repair(repairInfo);
    await result.save();

    return result;
}



module.exports = {
    getAll,
    getById,
    create,
}