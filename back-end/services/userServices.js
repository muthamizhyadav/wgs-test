const { User, Slot, Token, bookedSlot } = require("../models/user.model")
const Tokenas = require('../middleware/jwt.token')
var bcrypt = require('bcryptjs');


const RegisterUsers = async (req) => {
    const { password } = req.body
    let salt = await bcrypt.genSalt(8);
    console.log(salt)
    let hasPWD = await bcrypt.hash(password, salt)
    let count = await User.find().count()
    let datas = { ...req.body, ...{ password: hasPWD, _id: count + 1 } }
    let creations = await User.create(datas)
    return creations
}


const LoginUsers = async (req) => {
    const { userName, password } = req.body
    let findByUserName = await User.findOne({ userName })
    if (!findByUserName) {
        console.error("User Not Found");
    }
    console.log(findByUserName)
    let comparePWD = await bcrypt.compare(password, findByUserName.password)
    if (!comparePWD) {
        return { message: "Password Not Matched" }
    }
    let token = await Tokenas.genToken(findByUserName)
    return { token: token }
}

const createSlots = async (req) => {
    let creations = await Slot.create(req.body);
    return creations
}

const getAllSlots = async () => {
    let data = await Slot.find()
    return data
}

const getUsers = async (req) => {
    let userId = req.userId
    let findUser = await User.findById(userId)
    return findUser
}

const bookingSlots = async (req) => {
    const { token, slotId } = req.body
    let findToone = await Token.findOne({ token: token })
    if (findToone) {
        let findSlotBooking = await bookedSlot.find({ userId: findToone.userId }).count()
        if(findToone.userId == 3){
            let findSlot = await bookedSlot.find({slotActive: false,userId:1})
            if(findSlot.length>1){
            await  bookedSlot.findByIdAndUpdate({_id:findSlot[1]._id},{slotActive:true},{new:true})
            }
        }else if(findToone.userId == 4){
            let findSlot = await bookedSlot.find({slotActive: false,userId:2})
            if(findSlot.length>1){

                await  bookedSlot.findByIdAndUpdate({_id:findSlot[1]._id},{slotActive:true},{new:true})
            }
        }
        if (findSlotBooking > 0) {
          
            let createBookeng = await bookedSlot.create({ slotNumber: slotId, userId: findToone.userId, slotActive: false });
            let findUser = await User.findById(findToone.userId)
            findUser.userAmount = findUser.userAmount - 100;
            findUser.save()
            return createBookeng
        } else {
            let findUser = await User.findById(findToone.userId)
            findUser.userAmount = findUser.userAmount - 100;
            findUser.save()
            let createBookeng = await bookedSlot.create({ slotNumber: slotId, userId: findToone.userId, slotActive: true });
            return createBookeng
        }
    }
}

const getBookedSlots = async (req) => {
    const { token } = req.body;
    let findToone = await Token.findOne({ token: token })
    console.log(findToone)
    console.log(findToone.userId)
    let getSlots = await bookedSlot.aggregate([{
        $match: {
            userId: findToone.userId
        }
    },
    {
        $sort:{slotActive:-1}
    }

    ])
    return getSlots

}

const getDetailsView = async ()=>{
    let values = await User.aggregate([
        {
        $lookup:{
            from:"bookedslots",
            localField:"_id",
            foreignField:"userId",
            pipeline:[{$match:{slotActive :true}}],
            as:"slots"
        }
    }
])
    return values
}

module.exports = {
    RegisterUsers,
    LoginUsers,
    createSlots,
    getAllSlots,
    getUsers,
    bookingSlots,
    getBookedSlots,
    getDetailsView
}