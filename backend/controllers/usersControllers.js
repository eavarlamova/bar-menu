// const Sequelize = require('sequelize')
// const Op = Sequelize.Op;
const { hash, verify } = require("argon2");
const jwt = require("jsonwebtoken");

const { Users, JWTtemp, Products } = require("../models");

const getPublicUsersData = (user) => ({
  id: user.id,
  role: user.role,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  users_ingredients: user.users_ingredients,

  products: user.products,
})

const usersControllers = {

  async checkJWT({ params: { jwt } }, res, next) {
    try {
      const findJWT = await JWTtemp.findOne({
        where: { jwt },
      })
      if (findJWT) {
        const { dataValues: { user_id: id } } = findJWT
        const { dataValues: findUser } = await Users.findOne({
          where: { id }
        })
        const userData = getPublicUsersData(findUser);
        res.status(200).send(userData)
      }
      else {
        throw new Error()
      }
    }
    catch (error) {
      res.status(402).send({ msg: 'jwt token is die' })
    }
  },

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
        const jwtToken = `JWT ${jwt.sign(newUser, 'secret')}`
        await JWTtemp.create({
          jwt: jwtToken,
          user_id: newUser.id,
        })

        const payload = {
          jwt: jwtToken,
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
      const findUser = await Users.findOne({
        where: { email: body.email },
      });
      if (findUser) {
        const { dataValues: currentUser } = findUser;
        const varifyPasswordResult = await verify(currentUser.password, body.password.trim());
        if (varifyPasswordResult) {
          const jwtToken = `JWT ${jwt.sign(currentUser, 'secret')}`

          await JWTtemp.create({
            jwt: jwtToken,
            user_id: currentUser.id,
          })

          const payload = {
            jwt: jwtToken,
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

  async signOut({ params: { jwt } }, res, next) {
    try {
      const response = await JWTtemp.destroy({
        where: {
          jwt
        }
      });
      res.sendStatus(200)
    }
    catch (error) {
      res.status(500).send({ msg: 'server error of sign out' })
    }
  },
};

module.exports = usersControllers;