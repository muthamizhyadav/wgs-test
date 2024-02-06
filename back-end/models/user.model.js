const mongoose = require('mongoose')
const { v4 } = require('uuid')

const UserSchema = new mongoose.Schema({
    _id:{
        type:Number,
    },
    userName:{
        type:String,
    },
    userAmount:{
        type:Number
    },
    password:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    }
},{timestamps:true})


const AuthTokenSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    userId:{
        type:Number
    },
    token:{
        type:String
    }
},{timestamps:true})

const createSlots = new mongoose.Schema({
    _id:{
        type:String,
        default:v4,
    },
    slotNo:{
        type:Number
    },
    active:{
        type:Boolean,
        default:true
    }
},)

const userbookedSlot = new mongoose.Schema({
    _id:{
        type:String,
        default:v4,
    },
    slotNumber:{
        type:String,
    },
    userId:{
        type:Number,
    },
    slotActive:{
        type:Boolean,
        default:true
    }
})

const User = mongoose.model('users',UserSchema)
const Token = mongoose.model('token',AuthTokenSchema)
const Slot = mongoose.model('slots',createSlots)
const bookedSlot = mongoose.model('bookedslots',userbookedSlot)



module.exports = {
    User,
    Token,
    bookedSlot,
    Slot
}