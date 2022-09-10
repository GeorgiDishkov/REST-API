const { model, Schema } = require('mongoose');

const userSchema = Schema({
    email: { type: String, required: true, minLength: 5 },
    hashedPassowrd: { type: String, required: true },
})


userSchema.index({ mail: 1 }, {
    collation: {
        locale: 'en',
        strength: 1,
    }
})

const User = model('User', userSchema);

module.exports = User;