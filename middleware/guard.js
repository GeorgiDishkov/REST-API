const e = require("express");

function isAuth() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.status(401).json({ message: 'You are allready signed in' });
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        if (req.user && req.user._id == res.locals.repair.owner) {
            next();
        } else {
            res.status(403).json({})
        }
    }
}

module.exports = {
    isAuth,
    isGuest,
    isOwner
}