const Home = require("../models/home.model")
const CustomError = require("../utils/custom-error.js")

const createHome = async (req, res, next) => {
    try {
        const {address,description,phone,status,typeofHome,price,kv,currency,city,countofRoom} = req.body;
        const photos = req.imageNames;
        const home = await Home.create({address,description,phone,status,typeofHome,price,kv,currency,countofRoom,city,photos})
        res.status(201).json({message: "success",data:home});
    } catch (error) {
        next(error)
    }
}

const filterHome = async (req, res, next) => {
    try {
        const { address, status, typeofHome, fromprice, toprice, kv, currency,countofRoom, city , search} = req.query;
        const filter = {};
        filter.isActive = true
        if (address) {
            filter.address = address;
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
        if (kv) {
            filter.kv = kv;
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
        const data = await Home.find(filter);

        res.json({ message: "Success", data });
    } catch (error) {
        next(error);
    }
}

// const getAllHome = async(req,res,next) => {
// try {
//     const data = await Home.find()
//     res.json({message: "Succes",data})
// } catch (error) {
//     next(error)
// }
// }


const getOneHome = async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await Home.findOne({_id:id,isActive:true})
        if(!data) throw new CustomError(404,"Not found")
        res.json({message: "succes", data})
    } catch (error) {
        next(error)
    }
}

const updateHome = async (req, res, next) => {
    try {
        const {address, description, phone, status, typeofHome, price, currency, city ,countofRoom} = req.body;
        const {id} = req.params;
        const photos = req.imageNames;
        const updatedData = await Home.findByIdAndUpdate(id, {
            address,
            description,
            phone,
            status,
            typeofHome,
            price,
            currency,
            countofRoom,
            city,
            photos
        }, { new: true });
        
        res.json({ message: "Success", data: updatedData });
    } catch (error) {
        next(error);
    }
}

const deleteHome = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Home.findByIdAndUpdate(id, {isActive:false }, { new: true });   
        res.json({message: "Success"})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createHome,
    filterHome,
    // getAllHome,
    getOneHome,
    updateHome,
    deleteHome
}