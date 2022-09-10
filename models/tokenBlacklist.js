const { model, Schema } = require('mongoose');

const blackListSchema = Schema({
    blackList: [String],
})

const blackList = model('blacklist', blackListSchema);
module.exports = blackList;