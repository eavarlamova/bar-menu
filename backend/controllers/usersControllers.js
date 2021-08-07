// const Sequelize = require('sequelize')
// const Op = Sequelize.Op;
const { hash, verify } = require("argon2");
const jwt = require("jsonwebtoken");

const { Users } = require("../models");

const getPublicUsersData = (user) => ({
  id: user.id,
  role: user.role,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  users_ingredients: user.users_ingredients ,
})

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
        // write jwt in db-table 
        const payload = {
          jwt: `JWT ${jwtToken}`,
          ...getPublicUsersData(newUser),
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
  async signIn({ body }, res, next) {
    try {
      console.log('body', body)
      const findUser = await Users.findOne({
        // const { dataValues: findUser } = await Users.findOne({
          where: { email: body.email }
      });
      if (findUser) {
const { dataValues: currentUser } = findUser;
        const varifyPasswordResult = await verify(currentUser.password, body.password.trim());
        if (varifyPasswordResult) {
          const jwtToken = jwt.sign(currentUser, 'secret')  
          // write jwt in db-table 
          const payload = {
            jwt: `JWT ${jwtToken}`,
            ...getPublicUsersData(currentUser),
          };
          res.status(200).send(payload)
        }
        else {
          res.status(402).send({ msg: 'password is not correct' })
        }
      }
      else {
        res.status(402).send({ msg: 'this email is not exist' })
      }
    }
    catch (error) {
      res.status(500).send({ msg: 'oops... some problem in server work' })
    }
  },
};

module.exports = usersControllers;