const { LoginSchema } = require("../../utils/validators/AdminValidator");
const AuthorAuthModels = require("../../models/auth/author.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const AuthorLogin = async (req, res) => {
    const status = false;
    const { email, password } = req.body;
    const { error } = LoginSchema.validate({ email, password });


    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            status,
        })
    }
    // const adminAuth = AuthorAuthModels(email);

    // sending to the Login models
    const data = {
        email,
        password
    }
    let result = await AuthorAuthModels.LoginModels(data);
    if (result.status) {
        const token = jwt.sign(
            {
                role: "admin"
            },
            process.env.SECRET_KEY || 'secret',
            { expiresIn: '2d' }
        );
        res.cookie(
            'AUTHOR_TOKEN',
            token,
            {
                maxAge: 2 * 24 * 60 * 60 * 1000
            }
        );
        return res.status(200).json(
            {
                token,
                result,
                role: "author"
            }
        )
    }
    return res.status(401).json(
        {
            result,
        }
    )
}

const AuthorLogout = (req, res) => {
    res.clearCookie('AUTHOR_TOKEN', {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
        sameSite: 'strict', // Prevents CSRF
    });
    return res.status(200).json({
        message: "Logout successful",
        status: true,
    });

}
module.exports = {
    AuthorLogin,
    AuthorLogout
}