module.exports = function (app) {
    var userHandlers = require('../controllers/userController');
    var productHandlers = require('../controllers/productController')

    // Authentication Routes
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/login')
        .post(userHandlers.sign_in);
    app.route("/auth/profile")
        .get(userHandlers.loginRequired, userHandlers.getProfile)
    // User Routes
    app.route("/users")
        .get(userHandlers.loginRequired, userHandlers.adminRequired, userHandlers.getUsers)
    app.route("/user")
        .get(userHandlers.loginRequired, userHandlers.adminRequired, userHandlers.getUser)
    app.route("/user")
        .put(userHandlers.loginRequired, userHandlers.adminRequired, userHandlers.updateUser)
    app.route("/user")
        .delete(userHandlers.loginRequired, userHandlers.adminRequired, userHandlers.deleteUser)
    app.route("/user/avatar")
        .get(userHandlers.loginRequired, userHandlers.getAvatar)
    // Product Routes
    app.route("/products")
        .get(productHandlers.getProducts)
    app.route("/product")
        .get(productHandlers.getProduct)
    app.route("/products")
        .post(userHandlers.loginRequired, userHandlers.adminRequired, productHandlers.createProducts)
    app.route("/product")
        .post(userHandlers.loginRequired, userHandlers.adminRequired, productHandlers.createProduct)
    app.route("/product")
        .delete(userHandlers.loginRequired, userHandlers.adminRequired, productHandlers.deleteProduct)
    app.route("/product")
        .put(userHandlers.loginRequired, userHandlers.adminRequired, productHandlers.updateProduct)
};