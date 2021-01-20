
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    isBooked: {
        type: Boolean,
        required: true,
        default: false
    },
    fare: {
        type: Number,
        required: true,
        default: 100
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);