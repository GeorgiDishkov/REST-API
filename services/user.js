const bcrypt = require('bcrypt');
const User = require('../models/user');
const BlackList = require('../models/tokenBlacklist')
const jwt = require('jsonwebtoken');
const { off } = require('../models/user');

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

async function login(email, password) {
    console.log(email, password);
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new Error(`Incorrect email or password`);
    }

    const match = await bcrypt.compare(password, user.hashedPassowrd);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return (user);
}

async function logout(token) {
    const blacklist = await BlackList.find({});
    blacklist.push(token);
    await blacklist.save();
}

async function verifySession(token) {
    const blaclist = await BlackList.find({});
    if (!blaclist.includes(token)) {
        const payload = jwt.verify(token, JWT_SECRET);

        return {
            email: payload.email,
            _id: payload._id,
            token
        }
    } else {
        throw new Error('Token is invalidated');
    }
}


function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET, 'Stack', {
            expiresIn: '24h'
        })
    }
}

module.exports = {
    register,
    login,
    verifySession
};