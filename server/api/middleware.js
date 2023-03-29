const { useRouteLoaderData } = require('react-router-dom');
const { User } = require('../db');

const isLoggedIn = async(req, res, next) => {
    //checking if the user is currently logged in by the token
    const user = await User.findByToken(req.headers.authorization);
    //if Token available attached user to req (without the password)
    user.password = undefined;

    req.user = user;
    next();
}

module.exports = isLoggedIn;