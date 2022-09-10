const router = require('express').Router();
const mapErrors = require('../utils/errorMapper');
const { register, login } = require('../services/user');
const { isGuest, isAuth } = require('../middleware/guard');

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.email.trim() == '' || req.body.password.trim() == '') {
            throw new Error('Email and password are required')
        }

        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim());
        console.log(result);
        res.status(201).json(result)

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error })
    }
})

router.post('/login', isGuest(), async (req, res) => {
    console.log(req.body);
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        console.log(result);
        res.json(result)

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error })
    }
})

router.get('/logout', isAuth(), (req, res) => {
    console.log(`logout`);
    res.end();
})
module.exports = router;
