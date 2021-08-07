const { Products ,Users} = require('../models')

const productsControllers = {
    async add({ body }, res, next) {
        try {
            // validate body
            const newProduct = await Products.create(body)

            const allProducts = await Products.findAll({
                inclue: [{
                    model: Users,
                    as: 'author',
                    attributes: ['email']
                  }],
            })
            console.log('newProduct', newProduct)
        }
        catch(error){
            console.log('#######', error, '#######')
        }
        
    },
}

module.exports = productsControllers;