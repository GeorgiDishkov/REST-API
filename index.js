const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');

const catalogControler = require('./contorllers/catalog')
const userControler = require('./contorllers/user')

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
    app.use('/data/catalog', catalogControler)
    app.use('/user', userControler)

    app.get(`/`, (req, res) => res.json({ messsage: 'REST Services operational' }))

    app.listen(PORT, () => console.log('Server work right'));

}
