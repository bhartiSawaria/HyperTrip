
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const busSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    number: {
        type: String,
        required: true,
        maxlength: 15
    },

    startCity: {
        type: String,
        required: true,
        maxlength: 30
    },

    endCity: {
        type: String,
        required: true,
        maxlength: 30
    },

    bookedSeats: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ticket'
    }]
});

module.exports = mongoose.model('Bus', busSchema);