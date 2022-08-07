module.exports = function(app) {
    var userHandlers = require('../controllers/userController');
    var productHandlers = require('../controllers/productController')
 
    // Authentication Routes
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    // User Routes
    app.route("/users")
        .get(userHandlers.loginRequired, userHandlers.getUsers)
    app.route("/user")
        .get(userHandlers.loginRequired, userHandlers.getUser)
    app.route("/user")
        .post(userHandlers.loginRequired, userHandlers.createUser)
    app.route("/user")
        .put(userHandlers.loginRequired, userHandlers.updateUser)
    app.route("/user")
        .delete(userHandlers.loginRequired, userHandlers.deleteUser)
    // Product Routes
    app.route("/products")
        .get(productHandlers.getProducts)
    app.route("/product")
        .get(productHandlers.getProduct)
    app.route("/products")
        .post(userHandlers.loginRequired, productHandlers.createProducts)
    app.route("/product")
        .post(userHandlers.loginRequired, productHandlers.createProduct)
    app.route("/product")
        .delete(userHandlers.loginRequired, productHandlers.deleteProduct)
    app.route("/product")
        .put(userHandlers.loginRequired, productHandlers.updateProduct)
};