const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

async function login() {

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
    register
};