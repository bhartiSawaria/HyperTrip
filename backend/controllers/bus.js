
const userUtils = require('../database/user');
const busUtils = require('../database/bus');

exports.getAllBuses = async(req, res, next) => {
    try{
        const buses = await busUtils.findAllBuses();
        if(!buses)
            throw new Error('Some db error');
        res.status(200).json({
            message: 'Buses fetched successfully',
            success: true,
            buses: buses
        });
    }
    catch(error){
        error.setStatus = 500;
        next(error);
    }
}

exports.getSearchedBuses = async(req, res, next) => {
    try{
        const startCity = req.body.startCity;
        const endCity = req.body.endCity;
        const journeyDate = req.body.journeyDate;
        const buses = await busUtils.findBusBySpecificFields(startCity, endCity, journeyDate);
        if(!buses)
            throw new Error('Some db error');
        res.status(200).json({
            message: 'Buses fetched successfully',
            success: true,
            buses: buses
        })
    }
    catch(error){
        error.setStatus = 500;
        next(error);
    }
}

exports.getBookedSeats = async(req, res, next) => {
    try{
        const busId = req.params.busId;
        const bus = await busUtils.findBusById(busId);
        if(!bus){
            throw new Error('Some db error');
        }
        const bookedSeats = bus.bookedSeats.map(seat => {
            return seat.number;
        });
        res.status(200).json({
            message: 'Seats fetched successfully',
            success: true,
            bookedSeats: bookedSeats
        });
    }
    catch(error){
        error.setStatus = 500;
        next(error);
    }
}
