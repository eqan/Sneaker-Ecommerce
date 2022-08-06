const UserModel = require('../models/User');
const Users = require('../controllers/userController');
module.exports = function(app) {
    var userHandlers = require('../controllers/userController');
 
    app.route("/users")
        .get(userHandlers.loginRequired, userHandlers.getUsers)
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
};