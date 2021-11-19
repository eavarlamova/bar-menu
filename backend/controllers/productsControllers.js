const { Products, Users } = require('../models')

const { checkAuthUser } = require("./helpers/checkAuth")


// const allProducts = await Products.findAll({
//     include: [{
//         model: Users,
//         as: 'author',
//         attributes: ['email', 'name', 'avatar']
//     }],
// })


const productsControllers = {
  async addProduct(req, res, next) {
    try {
      const { body } = req;
      const updateBody = JSON.parse(body.product)
      const findJWT = await checkAuthUser(req);

      if (findJWT) {
        const pathPhoto = req.file && req.file.filename || null
        const newProduct = await Products.create({
          ...updateBody,
          photo: pathPhoto && `http://localhost:4000/images/${pathPhoto}`,
        })
        res.status(200).send(newProduct)
      }
      else {
        throw new Error();
      }
    }
    catch (error) {
      res.status(500).send({ msg: 'oops... some problem with adding your product' })
    }
  },
  async getUsersProducts(req, res, next) {
    try {
      const findJWT = await checkAuthUser(req);
      if (findJWT) {
        const usersProducts = await Products.findAll({
          where: { users_id: req.params.id },
          include: [{
            model: Users,
            as: 'author',
            attributes: ['email', 'name', 'avatar']
          }],
          attributes: [
            'id',
            'steps',
            'photo',
            'product',
            'ingredients',
            'descriptions',
          ],
        });
        res.status(200).send(usersProducts);
      }
      else {
        throw new Error()
      }
    }
    catch (error) {
      res.status(500).send({ msg: 'oops... some problem with gettins user`s products', error })
    }
  },
  async deleteProduct(req, res, next) {
    try {
      const findJWT = await checkAuthUser(req);
      if (findJWT) {
        await Products.destroy({
          where: {
            id: req.params.id
          }
        });
        res.sendStatus(200);
      }
      else {
        throw new Error();
      }
    }
    catch (error) {
      res.status(500).send({ msg: 'oops... some problem with deleting  the product' })
    }
  },
  async editProduct(req, res, next) {
    try {
      const findJWT = await checkAuthUser(req);
      if (findJWT) {
        const { body, file } = req;
        console.log('body', body)
        const updateBody = JSON.parse(body.product)
        console.log('updateBody.photo', updateBody.photo)
        const pathPhoto = file && file.filename || null;
        const newBody = {
          ...updateBody,
          photo: pathPhoto ? `http://localhost:4000/images/${pathPhoto}` : updateBody.photo || null,
        }
        await Products.update(
          newBody,
          { where: { id: updateBody.id } },
        )
        res.status(200).send(newBody);
      }
      else {
        res.status(402).send({ msg: 'oops... some problem with edit the product because you are unauthorathed' })
      }
    }
    catch (error) {
      console.log('error', error)
      res.status(500).send({ msg: 'oops... some problem with edit the product' })
    }
  }
}

module.exports = productsControllers;