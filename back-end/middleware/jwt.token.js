const JWT = require('jsonwebtoken')
const { Token } = require('../models/user.model')

const genToken = async (data)=>{
    let jwtScretKEY = 'gfg_jwt_secret_key';
    let datas = data;
    console.log(datas)
    const token = JWT.sign(datas._id, jwtScretKEY);
    let storeToken = await Token.create({token:token,userId:data._id})
    console.log(storeToken)
    return token
}

module.exports= {
    genToken
}