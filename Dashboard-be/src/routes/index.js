const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CategoryRouter = require('./CategoryRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/product', ProductRouter)
}

module.exports = routes