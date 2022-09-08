const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');

const PORT = 3030;

start()

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/accountant', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log('Database work!');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get(`/` , (req, res) => res.json({messsage : 'REST Services operational'}))

    app.listen(PORT, () => console.log('Server work right'));

}