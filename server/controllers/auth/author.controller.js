const { LoginSchema } = require("../../utils/validators/AuthValidator");
const AuthorAuthModels = require("../../models/auth/author.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
dotenv.config();



const AuthorLogin = async (req, res) => {
    const status = false;
    const { email, password } = req.body;
    const { error } = LoginSchema.validate({ email, password });


    if (error) {
        let result = {
            message: error.details[0].message,
            status,
        }
        return res.json(result)
    }

    // sending to the Login models
    const data = {
        email,
        password
    }
    let result = await AuthorAuthModels.LoginModels(data);
    if (result.status) {
        const token = jwt.sign(
            {
                user: {
                    role: "author",
                    data: result.userinfo
                }
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
                result,
            }
        )
    }
    return res.json(
        result
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

const AuthorRegister = async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body;
        const hasedPassword = await bcrypt.hash(password, 10);
        const result = await AuthorAuthModels.RegisterModel({ first_name, last_name, email, hasedPassword });
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }

}
module.exports = {
    AuthorLogin,
    AuthorLogout,
    AuthorRegister
}