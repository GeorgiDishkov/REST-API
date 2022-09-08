const router = require('express').Router();
const api = require('../services/repair');
const mapErrors = require('../utils/errorMapper');

router.get(`/`, async (req, res) => {

    const data = await api.getAll()
    res.json(data)

    res.end();
})

router.post(`/`, async (req, res) => {

    // to do mapper for all repairs with same type
    const repair = {
        typeOfRepair: req.body.typeOfRepair,
        carOwner: req.body.carOwner,
        carRegistration: req.body.carRegistration,
        priceOfRepair: req.body.priceOfRepair,
        costForRepair: req.body.costForRepair,
    }
    try {
        // throw new Error('Test error')
        const result = await api.create(repair);
        res.status(201).json(result)
    } catch (err) {
        console.error(err.message);
        // to take all errors in FE , to convert it in obj with key (message : error) ,and to change status over 400
        const error = mapErrors(err).join(`\n`)
        res.status(400).json({ message: error });
    }

})

router.put(`/`, async (req, res) => {
    const result = await api.getById(req.params.id);
    res.json(result);
    res.end();
})

router.delete(`/`, (req, res) => {
    console.log(`DELETE catalog`);
    res.end();
})

module.exports = router;
