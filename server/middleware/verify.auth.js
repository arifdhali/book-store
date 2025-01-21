const jwt = require('jsonwebtoken');
const AuthenticateJWTtoken = (req, res, next) => {
    const token = req.cookies.ADMIN_TOKEN;
    if (!token) {
        return res.status(403).json({
            status: false,
            message: "Unathorized, jwt token is required"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode.user;
        next();

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: false,
                message: "Unathorized, jwt token is expired"
            })
        } else {
            return res.status(403).json({
                status: false,
                message: "Unathorized, jwt token couldn't verify"
            })
        }
    }



}
module.exports = AuthenticateJWTtoken;