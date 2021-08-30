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
            const findJWT = await checkAuthUser(req);
            if (findJWT) {
                const newProduct = await Products.create(body)
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
            await Products.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.sendStatus(200);
        }
        catch (error) {
            res.status(500).send({ msg: 'oops... some problem with deleting  the product' })
        }
    }
}

module.exports = productsControllers;