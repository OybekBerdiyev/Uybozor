const Rent = require("../models/rent.model")
const CustomError = require("../utils/custom-error.js")

const createRent = async (req, res, next) => {
    try {
        const {address,description,phone,status,typeofHome,countofRoom,price,kv,currency,city,toWhom} = req.body;
        const photos = req.imageNames;
        const home = await Rent.create({address,description,phone,status,countofRoom,typeofHome,price,kv,currency,toWhom,city,photos})
        res.status(201).json({message: "success",data:home});
    } catch (error) {
        next(error)
    }
}

const filterRent = async (req, res, next) => {
    try {
        const { address, status, typeofHome, fromprice, toprice,toWhom, currency,countofRoom,city , search} = req.query;
        const filter = {};
        filter.isActive = true
        if (address) {
            filter.address = address;
        }
        if (toWhom) {
            filter.toWhom = toWhom;
        }
        if (status) {
            filter.status = status;
        }
        if (countofRoom) {
            filter.countofRoom = countofRoom;
        }
        if (typeofHome) {
            filter.typeofHome = typeofHome;
        }
        if (fromprice && toprice) {
            filter.price = { $gte: fromprice, $lte: toprice };
        } else if (fromprice) {
            filter.price = { $gte: fromprice };
        } else if (toprice) {
            filter.price = { $lte: toprice };
        }
        if (currency) {
            filter.currency = currency;
        }

        if (city) {
            filter.city = city;
        }
        if (search) {
            filter.$or = [
                { description: { $regex: search, $options: 'i' } },
                { title: { $regex: search, $options: 'i' } },
                { city: { $regex: search, $options: 'i' } }
            ];
        }
        const data = await Rent.find(filter);

        res.json({ message: "Success", data });
    } catch (error) {
        next(error);
    }
}

// const getAllRent = async(req,res,next) => {
// try {
//     const data = await Rent.find()
//     res.json({message: "Succes",data})
// } catch (error) {
//     next(error)
// }
// }


const getOneRent = async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await Rent.findOne({_id:id,isActive:true})
        if(!data) throw new CustomError(404,"Not found")
        res.json({message: "succes", data})
    } catch (error) {
        next(error)
    }
}

const updateRent = async (req, res, next) => {
    try {
        const { address, description, phone, status, typeofHome, countofRoom, price, currency, city, toWhom } = req.body;
        const { id } = req.params;
        const photos = req.imageNames;

        const updatedData = await Rent.findByIdAndUpdate(id, {
            address,
            description,
            phone,
            status,
            typeofHome,
            countofRoom,
            price,
            currency,
            city,
            toWhom,
            photos,
        }, { new: true }); 

        if (!updatedData) {
            return res.status(404).json({ message: "Rent not found" });
        }

        res.json({ message: "Success", data: updatedData });
    } catch (error) {
        next(error);
    }
}


const deleteRent = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Rent.findByIdAndUpdate(id, {isActive:false }, { new: true });   
        res.json({message: "Success"})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createRent,
    filterRent,
    // getAllRent,
    getOneRent,
    updateRent,
    deleteRent
}