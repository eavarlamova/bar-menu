// const Sequelize = require('sequelize')
// const Op = Sequelize.Op;
const { hash, verify } = require("argon2");
const jwt = require("jsonwebtoken");

const { Users } = require("../models");


const usersControllers = {
    async signUp({ body }, res, next) {
        try {
            const findUser = await Users.findOne({
                where: { email: body.email }
            })
            if (!findUser) {
                const hashPassword = await hash(body.password);
                const { dataValues: newUser } = await Users.create({
                    ...body,
                    password: hashPassword,
                    role: "user",
                })
                const jwtToken = jwt.sign(newUser, 'secret')
                const payload = {
                    jwt: `JWT ${jwtToken}`,
                    email: newUser.email,
                    name: newUser.name,
                    id: newUser.id,
                    role: newUser.role,
                }
                res.status(200).send(payload)
            }
            else {
                res.status(401).send({ msg: 'the email already exist' })
            }
        }
        catch (error) {
            res.status(500).send({ msg: 'oops... some problem in server work' })
        }
    },
};

module.exports = usersControllers;