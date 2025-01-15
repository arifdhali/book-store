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
        return res.status(400).json({
            message: error.details[0].message,
            status,
        })
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
                role: "author",
                user: result.userinfo
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
            }
        )
    }
    return res.status(401).json(
        result,
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
    const thumbnail = req?.file;
    if (!thumbnail) {
        return res.json({
            status: false,
            message: "No thumbnail uploaded",
        });
    }
    const profile_img = thumbnail?.filename;
    const { name, email, bio, dob, address, phone_no, social_link, plain_password } = req.body;
    const password = await bcrypt.hash(plain_password, 10);
    const result = await AuthorAuthModels.RegisterModel({ name, email, profile_img, bio, dob, address, phone_no, social_link, password });
    console.log(result);


}
module.exports = {
    AuthorLogin,
    AuthorLogout,
    AuthorRegister
}