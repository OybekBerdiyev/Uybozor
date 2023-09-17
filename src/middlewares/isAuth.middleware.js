const CustomError = require('../utils/custom-error');
const jwt = require('../utils/jwt');

const isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) { throw new CustomError(401,'Invalid token' ) };
        jwt.verify(token, (err, result) => {
            if (err) { throw new CustomError(401,'Invalid token' ) }
            req.verify = result
            next();
        });
    } catch (error) {
        next(error);
    }
}

module.exports = isAuth;