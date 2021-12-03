const { Products, Users } = require('../models')

const { checkAuthUser } = require("./helpers/checkAuth")


// const allProducts = await Products.findAll({
//     include: [{
//         model: Users,
//         as: 'author',
//         attributes: ['email', 'name', 'avatar']
//     }],
// })

const getFullProductsInformation = (id) => (
  Products.findOne({
    where: { id },
    include: [{
      model: Users,
      as: 'author',
      attributes: ['email', 'name', 'avatar']
    }],
  })
);


const productsControllers = {
  async addProduct(req, res, next) {
    try {
      const { body } = req;
      const updateBody = JSON.parse(body.product)
      const hasAccess = await checkAuthUser(req);

      if (hasAccess) {
        const pathPhoto = req.file && req.file.filename || null
        const newProduct = await Products.create({
          ...updateBody,
          photo: pathPhoto && `http://localhost:4000/images/${pathPhoto}`,
        })
        const fullProductsInformation = await getFullProductsInformation(newProduct.id)
        res.status(200).send(fullProductsInformation)
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
      const hasAccess = await checkAuthUser(req);
      if (hasAccess) {
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
      const hasAccess = await checkAuthUser(req);
      if (hasAccess) {
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
      const hasAccess = await checkAuthUser(req);
      if (hasAccess) {
        const { body, file } = req;
        const updateBody = JSON.parse(body.product)
        const pathPhoto = file && file.filename || null;
        const newBody = {
          ...updateBody,
          photo: pathPhoto ? `http://localhost:4000/images/${pathPhoto}` : updateBody.photo || null,
        }
        await Products.update(
          newBody,
          { where: { id: newBody.id } },
        )
        const fullProductsInformation = await getFullProductsInformation(newBody.id)
        res.status(200).send(fullProductsInformation);
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