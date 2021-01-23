
const busUtils = require('../database/bus');
const userUtils = require('../database/user');

exports.postAddBus = async(req, res, next) => {

    try{
        const busDetails = {
            name: req.body.name,
            number: req.body.number,
            startCity: req.body.startCity,
            endCity: req.body.endCity,
            journeyDate: req.body.journeyDate,
            createdBy: req.userId
        }

        const createdBus = await busUtils.createBus(busDetails);
        res.status(201).json({
            message: 'Bus added successfully',
            success: true,
            createdBus: createdBus
        });
    }
    catch(error){
        error.setStatus = 500;    
        next(error);
    }   
}

exports.getBuses = async(req, res, next) => {
    try{
        const adminId = req.userId;
        const buses = await busUtils.findAdminBuses(adminId);
        res.status(200).json({
            message: 'Buses fetched successfullly.',
            success: true,
            buses: buses
        });
    }
    catch(error){
        error.setStatus = 500;    
        next(error);
    }
}

exports.postReset = async(req, res, next) => {
    
}