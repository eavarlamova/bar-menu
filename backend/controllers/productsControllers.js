const { Products, Users } = require('../models')

const productsControllers = {
    async add({ body }, res, next) {
        try {
            // validate body
            // const newProduct = await Products.create(body)

            const allProducts = await Products.findAll({
                include: [{
                    model: Users,
                    as: 'author',
                    attributes: ['email', 'name', 'avatar']
                }],
            })
            console.log('allProducts', allProducts)
            // console.log('newProduct', newProduct)
            res.status(200).send(allProducts)
        }
        catch (error) {
            console.log('#######', error, '#######')
        }

    },
}

module.exports = productsControllers;