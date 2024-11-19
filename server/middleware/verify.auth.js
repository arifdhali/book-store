const jwt = require('jsonwebtoken');
const validAdminVerify = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            status: false,
            message: "Unathorized, jwt token is required"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
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
module.exports = { validAdminVerify };