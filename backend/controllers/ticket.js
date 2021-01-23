
const ticketUtils = require('../database/ticket');
const busUtils = require('../database/bus');

exports.postBookTicket = async(req, res, next) => {
    try{
        const busInfo = req.body.busId;
        const bookedBy = req.userId;
        const selectedSeats = [...req.body.selectedSeats];
        const tickets = selectedSeats.map(seat => {
            return {
                busInfo: busInfo,
                bookedBy: bookedBy,
                number: seat
            }
        });
        const createdTickets = await ticketUtils.createMany(tickets);
        if(!createdTickets)
            throw new Error('Some db error');

        const bus = await busUtils.findBusById(req.body.busId);
        const updatedBookedSeats = [...bus.bookedSeats, ...createdTickets];
        bus.bookedSeats = updatedBookedSeats;
        const updatedBus = await busUtils.saveBus(bus);

        res.status(201).json({
            message: 'Tickets booked successfully',
            success: true
        });
    }
    catch(error){
        error.setStatus = 500;
        next(error);
    }
}