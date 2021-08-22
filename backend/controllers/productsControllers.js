const { Products, Users } = require('../models')



// const allProducts = await Products.findAll({
//     include: [{
//         model: Users,
//         as: 'author',
//         attributes: ['email', 'name', 'avatar']
//     }],
// })


const productsControllers = {
    async addProduct({ body }, res, next) {
        try {
            // validate body
            // check jwt in dataBase
            const newProduct = await Products.create(body)
            res.status(200).send(newProduct)
        }
        catch (error) {
            res.status(500).send({ msg: 'oops... some problem with adding your product' })
        }
    },
    async getUsersProducts(req, res, next) {
        try {
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
        catch (error) {
            res.status(500).send({ msg: 'oops... some problem with gettins user`s products' })
        }
    },
}

module.exports = productsControllers;