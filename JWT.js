const {sign} =require('jsonwebtoken')

const createTokens=(data)=>{
    const accesstoken = sign({id: data.id, username:data.username,phone:data.phone}, 'thisismyfirsttime',{expiresIn:'1d'});
    return accesstoken
}

module.exports = {createTokens}
