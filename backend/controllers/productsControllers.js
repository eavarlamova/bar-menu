const { Products } = require('../models')

const productsControllers = {
    async add({ body }, res, next) {
        try {
            // validate body
            const newProduct = await Products.create(body)
            console.log('newProduct', newProduct)
        }
        catch(error){
            console.log('#######', error, '#######')
        }
        
    },
}

module.exports = productsControllers;