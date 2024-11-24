const { LoginSchema } = require("../../utils/validators/AdminValidator");
const AdminAuthModels = require("../../models/auth/auth.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const AdminLogin = async (req, res) => {
    const status = false;
    const { email, password } = req.body;
    const { error } = LoginSchema.validate({ email, password });


    if (error) {
        return res.status(400).json({
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
                role: "admin"
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
    return res.status(401).json(
        {
            result,
        }
    )
}


module.exports = {
    AdminLogin
}