
const Ticket = require('../models/ticket');

exports.createMany = async(tickets) => {
    try{
        const createdTickets = await Ticket.insertMany(tickets);
        return createdTickets;
    }
    catch(error){
        error.message = 'Some db error!';
    }
}