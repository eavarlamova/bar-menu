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
            console.log('body', body)
            const updateBody = JSON.parse(body.product)
            // console.log('updateBody', updateBody)
            // console.log('req.headers', req.headers)
            // console.log('req.file', req.file)
            // console.log('req.files', req.files)
            // console.log('###########req.file.filename', req.file.filename)
            const findJWT = await checkAuthUser(req);

            if (findJWT) {
                const pathPhoto = req.file && req.file.filename || null
                console.log('${__dirname}', __dirname);
                console.log('`${__dirname}/../public/images/${pathPhoto}', `${__dirname}/../public/images/${pathPhoto}`)
                const newProduct = await Products.create({
                    ...updateBody,
                    photo: `http://localhost:4000/images/${pathPhoto}`,
                })
                res.status(200).send(newProduct)
            }
            else {
                throw new Error();
            }
        }
        catch (error) {
            console.log('#######', error, '#######')
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
                const { body } = req;
                await Products.update(
                    { ...body },
                    { where: { id: body.id } },
                )
                res.status(200).send(body);
            }
            else {
                res.status(402).send({ msg: 'oops... some problem with edit the product because you are unauthorathed' })
            }
        }
        catch (error) {
            res.status(500).send({ msg: 'oops... some problem with edit the product' })
        }
    }
}

module.exports = productsControllers;