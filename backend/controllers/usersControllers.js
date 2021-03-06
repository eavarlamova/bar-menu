const { hash, verify } = require("argon2");
const jwt = require("jsonwebtoken");

const { Users, JWTtemp, Products } = require("../models");

const { checkAuthUser } = require("./helpers/checkAuth")

const getPublicUsersData = (user) => ({
  id: user.id,
  role: user.role,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  users_ingredients: user.users_ingredients,

  products: user.products,
});


const usersControllers = {

  async checkJWT(req, res, next) {
    try {
      const findJWT = await checkAuthUser(req);
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

  async addIngredient(req, res, next) {
    try {
      const { body } = req;
      const findJWT = await checkAuthUser(req);
      if (findJWT) {
        const { dataValues: { user_id: id } } = findJWT;
        const {
          dataValues: {
            users_ingredients
          }
        } = await Users.findOne({
          where: { id }
        });
        const currentUsersIngredients = users_ingredients ? JSON.parse(users_ingredients) : [];
        currentUsersIngredients.push(body)

        await Users.update(
          { users_ingredients: JSON.stringify(currentUsersIngredients) },
          { where: { id } },
        )
        res.status(200).send(currentUsersIngredients);
      }
      else {
        res.status(402).send({ msg: 'server error of adding your ingredient by your unauthorithation' })
      }
    }
    catch (error) {
      res.status(500).send({ msg: 'server error of adding your ingredient' })
    }
  },

  async editIngredient(req, res, next) {
    try {
      const { body } = req;
      const findJWT = await checkAuthUser(req);
      if (findJWT) {
        const { dataValues: { user_id: id } } = findJWT;
        const {
          dataValues: {
            users_ingredients
          }
        } = await Users.findOne({
          where: { id }
        });
        const currentUsersIngredients = users_ingredients ? JSON.parse(users_ingredients) : [];
        const updateUsersIngredients = currentUsersIngredients.map(item => item.id === body.id ? body : item);
        await Users.update(
          { users_ingredients: JSON.stringify(updateUsersIngredients) },
          { where: { id } },
        );
        res.status(200).send(updateUsersIngredients);
      }
      else {
        res.status(402).send({ msg: 'server error of edit your ingredient because you are unauthorathed' })
      }
    }
    catch (error) {
      res.status(500).send({ msg: 'server error of edit your ingredient' })
    }
  },
  async deleteIngredient(req, res, next) {
    try {
      const { params: { id } } = req;
      const findJWT = await checkAuthUser(req);
      if (findJWT) {
        const { dataValues: { user_id } } = findJWT;
        const {
          dataValues: {
            users_ingredients
          }
        } = await Users.findOne({
          where: { id: user_id }
        });
        const currentUsersIngredients = users_ingredients ? JSON.parse(users_ingredients) : [];
        const updateUsersIngredients = currentUsersIngredients.filter(item => item.id !== id)

        await Users.update(
          { users_ingredients: JSON.stringify(updateUsersIngredients) },
          { where: { id: user_id } },
        );
        res.status(200).send(updateUsersIngredients);
      }
      else {
        res.status(402).send({ msg: 'server error of delete your ingredient because you are unauthorathed' })
      }
    }
    catch (error) {
      res.status(500).send({ msg: 'server error of delete your ingredient' })
    }
  },
  async getUserInfo(req, res, next) {
    try {
      const { params: { id } } = req;
      const userInfo = await Users.findOne({
        where: { id },
        include: [{
          model: Products,
          as: 'products',
          attributes: [
            'id',
            'steps',
            'photo',
            'product',
            'users_id',
            'ingredients',
            'descriptions',
          ],
        }],
        attributes:
          [
            'id',
            'email',
            'name',
            'avatar',
          ]
      });
      res.status(200).send(userInfo);
    }
    catch (error) {
      res.status(500).send({ msg: 'server error of getting user`s info' })
    }
  },
  async editUserData(req, res, next) {
    try {
      const findJWT = await checkAuthUser(req);
      if (findJWT) {
        const {
          body,
          file,
        } = req;
        const updateBody = JSON.parse(body.user).currentUser;
        const pathPhoto = file && file.filename || null;
        const { dataValues: findUser } = await Users.findOne({ where: { id: updateBody.id } })
        const dublicateEmail = await Users.findAll({ where: { email: updateBody.email } });

        if (updateBody.email !== findUser.email && dublicateEmail.length !== 0) {
          res.status(500).send({ msg: 'this email is exist' })
        }
        else {
          const updateData = {
            name: updateBody.name || findUser.name,
            email: updateBody.email || findUser.email,
            avatar: pathPhoto ? `http://localhost:4000/images/${pathPhoto}` : findUser.photo,
          }
          await Users.update(
            { ...updateData },
            { where: { id: updateBody.id } },
          );

          res.status(200).send({
            ...updateBody,
            ...updateData,
          });
        };
      }
      else {
        res.status(402).send({ msg: 'server error of editing your profile because you are unauthorathed' })
      }
    }
    catch (error) {
      res.status(500).send({ msg: 'server error of edit your personaly info' })

    }
  },
};

module.exports = usersControllers;