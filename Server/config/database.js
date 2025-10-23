const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('DB is connected.'))
    .catch((err) => {
        console.log('Error in Db connection.');
        console.error(err);
        process.exit(1);
    })
}