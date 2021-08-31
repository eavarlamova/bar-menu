const { JWTtemp, } = require("../../models");


const checkAuthUser = async (req) => {
    const {
        headers: {
            authorization: jwtForCheck
        }
    } = req;
    const findJWT = await JWTtemp.findOne({
        where: { jwt: jwtForCheck }
    })
    return findJWT;
}

module.exports = {
    checkAuthUser
}