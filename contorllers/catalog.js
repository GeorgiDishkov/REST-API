const router = require('express').Router();
const { isAuth, isOwner } = require('../middleware/guard');
const preload = require('../middleware/preload');
const api = require('../services/repair');
const mapErrors = require('../utils/errorMapper');

router.get(`/`, async (req, res) => {

    const data = await api.getAll()
    res.json(data)

    res.end();
})

router.post(`/`, isAuth(), async (req, res) => {

    // to do mapper for all repairs with same type
    const repair = {
        typeOfRepair: req.body.typeOfRepair,
        carOwner: req.body.carOwner,
        carRegistration: req.body.carRegistration,
        priceOfRepair: req.body.priceOfRepair,
        costForRepair: req.body.costForRepair,
        owner: req.user._id,
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

router.get('/:id', isAuth(), preload(), (req, res) => {
    const result = res.locals.repair
    res.json(result);
})


router.put(`/:id`, isAuth(), isOwner(), async (req, res) => {
    const repair = {
        typeOfRepair: req.body.typeOfRepair,
        carOwner: req.body.carOwner,
        carRegistration: req.body.carRegistration,
        priceOfRepair: req.body.priceOfRepair,
        costForRepair: req.body.costForRepair,
    }
    try {
        const result = await api.update(repair);
        res.json(result)
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err)
        res.status(400).json({ message: error });
    }
})

router.delete(`/:id`, isAuth(), isOwner(), async (req, res) => {
    try {
        await api.dell(req.params.id)
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err)
        res.status(400).json({ message: error });
    }
})

module.exports = router;