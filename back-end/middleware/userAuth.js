const { Token,User } = require('../models/user.model')

const Auth = async (req)=>{
    const token = req.headers.auth
    let findToken = await Token.findOne({token:token})
    console.log(token)
    if(findToken){
        let findUser = await User.findOne({_id:findToken.userId})
        console.log(findUser)
        return findUser
    }
    
}

module.exports = Auth