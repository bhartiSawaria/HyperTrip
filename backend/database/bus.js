
const Bus = require('../models/bus');

exports.createBus = async(busDetails) => {
    try{
        let createdBus = await new Bus(busDetails);
        createdBus = await createdBus.save();
        return createdBus;
    }
    catch(error){
        error.message = 'Some db error!';
        console.log(error);
    }
}

exports.findAdminBuses = async(adminId) => {
    try{
        const buses = await Bus.find({createdBy: adminId});
        return buses;
    }
    catch(error){
        error.message = 'Some db error!';
    }
}

exports.findAllBuses = async() => {
    try{
        const buses = await Bus.find();
        return buses;
    }
    catch(error){
        error.message = 'Some db error!';
    }
}

exports.findBusBySpecificFields = async(startCity, endCity, journeyDate) => {
    try{
        let buses;
        if(startCity !== '' && endCity !== '' && journeyDate !== ''){
            buses = await Bus.find({
                startCity: startCity, 
                endCity: endCity, 
                journeyDate: journeyDate
            });
        }
        else if(startCity !== '' && endCity !== ''){
            buses = await Bus.find({
                startCity: startCity, 
                endCity: endCity
            });
        }
        else if(startCity !== '' && journeyDate !== ''){
            buses = await Bus.find({
                startCity: startCity, 
                journeyDate: journeyDate
            });
        }
        else if(endCity !== '' && journeyDate !== ''){
            buses = await Bus.find({ 
                endCity: endCity, 
                journeyDate: journeyDate
            });
        }
        else if(startCity !== ''){
            buses = await Bus.find({
                startCity: startCity
            });
        }
        else if(endCity !== ''){
            buses = await Bus.find({
                endCity: endCity
            });
        }  
        else if(journeyDate !== ''){
            buses = await Bus.find({
                journeyDate: journeyDate
            });
        }
        return buses;
    }
    catch(error){
        error.message = 'Some db error!';
    }
}

exports.findBusById = async(busId) => {
    try{
        const bus = await Bus.findById(busId).populate({path:'bookedSeats', populate: ('bookedBy')}).exec();
        return bus;
    }
    catch(error){
        error.message = 'Some db error!';
    }
}

exports.saveBus = async(bus) => {
    try{
        return bus.save();
    }catch(error){
        error.message = 'Some db error!';
    }
}