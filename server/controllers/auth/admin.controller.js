const { LoginSchema } = require("../../utils/validators/AuthValidator");
const AdminAuthModels = require("../../models/auth/admin.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const AdminLogin = async (req, res) => {
    const status = false;
    const { email, password } = req.body;
    const { error } = LoginSchema.validate({ email, password });


    if (error) {
        return res.json({
            message: error.details[0].message,
            status,
        })
    }
    // const adminAuth = AdminAuthModels(email);

    // sending to the Login models
    const data = {
        email,
        password
    }
    let result = await AdminAuthModels.LoginModels(data);
    if (result.status) {
        const token = jwt.sign(
            {
                user: {
                    role: "admin"
                }                
            },
            process.env.SECRET_KEY || 'secret',
            { expiresIn: '2d' }
        );
        res.cookie(
            'ADMIN_TOKEN',
            token,
            {
                maxAge: 2 * 24 * 60 * 60 * 1000
            }
        );
        return res.status(200).json(
            {
                token,
                result,
                role: "admin"
            }
        )
    }
    return res.json(
        {
            result,
        }
    )
}

const AdminLogout = (req, res) => {
    res.clearCookie('ADMIN_TOKEN', {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
        sameSite: 'strict',
    });
    return res.status(200).json({
        message: "Logout successful",
        status: true,
    });

}
module.exports = {
    AdminLogin,
    AdminLogout
}