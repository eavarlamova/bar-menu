const { Products, Users } = require('../models')



// const allProducts = await Products.findAll({
//     include: [{
//         model: Users,
//         as: 'author',
//         attributes: ['email', 'name', 'avatar']
//     }],
// })



const productsControllers = {
    async add({ body }, res, next) {
        try {
            // validate body
            const newProduct = await Products.create(body)
            res.status(200).send(newProduct)
        }
        catch (error) {
            res.status(500).send({ msg: 'oops... some problem with adding your product' })
        }
    },
}

module.exports = productsControllers;