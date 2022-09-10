const { getById } = require('../services/repair');

module.exports = () => async (req, res, next) => {
    const id = req.params.id;
    try {
        const repair = await getById(id).lean();
        res.locals.repair = repair;
        next();
    } catch (err) {
        res.status(404).json({ message: 'Record not found' });
    }
}