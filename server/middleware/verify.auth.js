const jwt = require('jsonwebtoken');
const validAdminVerify = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            message: "Unathorized, jwt token is required"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        next();

    } catch (err) {
        return res.status(403).json({
            message: "Unathorized, jwt token is required"
        })
    }



}
module.exports = { validAdminVerify };