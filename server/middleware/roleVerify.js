const AuthorizedRole = (roles) => {
    return (req, res, next) => {
        const role = req.user.role;        
        if (!role || !roles.includes(role)) {
            return res.status(403).json({
                status: false,
                message: 'Access denied: Unauthorized role',
            });
        }
        next();
    }
}
module.exports = AuthorizedRole;