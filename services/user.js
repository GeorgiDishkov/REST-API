const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { create } = require('../models/user');

const JWT_SECRET = 'aiksdjaksdjaksdhhvajscvbaksbvkasf';

async function register(email, passowrd) {
    console.log(email, passowrd);
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (existing) {
        throw new Erorr('Email is allready taken');
    }

    const user = new User({
        email,
        hashedPassowrd: await bcrypt.hash(passowrd, 10)
    });

    await user.save();
    return createSession(user);
}

async function login(email, passowrd) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new Error(`Incorrect email or password`);
    }

    const match = await bcrypt.compare(passowrd, user.hashedPassowrd);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return createSession(user);
}

function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    }
}

module.exports = {
    register,
    login
};