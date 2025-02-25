const { LoginSchema } = require("../../utils/validators/AuthValidator");
const AuthorAuthModels = require("../../models/auth/author.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
dotenv.config();
const { generateAvatarImage } = require('text-to-avatar')
const fs = require('fs')
const path = require('path');
const { format } = require("date-fns/format");
const { add } = require("date-fns/add");
const crypto = require("crypto");
const { ForgotPasswordTemplate } = require("../../email/Template");
const EmailController = require("../../email/Email.controller");
let sendAuthorEmail = new EmailController();
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
        // secure: process.env.NODE_ENV === 'production',
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
        let base64Image = generateAvatarImage({ name: first_name, size: 100, positions: [1, 2] })
        let base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        let imageName = `${Date.now()}-${first_name}.png`
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'author');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadDir, imageName), base64Data, "base64");
        let profile = imageName;
        const hasedPassword = await bcrypt.hash(password, 10);
        const result = await AuthorAuthModels.RegisterModel({ first_name, last_name, email, profile, hasedPassword });
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }

}

const AuthorForgotPassword = async (req, res) => {
    let time = format(add(new Date(), { minutes: 10 }), 'yyyy-MM-dd HH:mm:ss');
    const { email } = req.body;
    try {
        const token = crypto.randomBytes(20).toString("hex");
        const hashedResetToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        let token_insertion = await AuthorAuthModels.insertForgotTokens(hashedResetToken, email, 'author', time);
        if (token_insertion.status) {
            let mailData = {
                to_user: email,
                subject: 'Forgot Password',
                html: ForgotPasswordTemplate(token, email, time, 'author')
            }
            let emailStatus = await sendAuthorEmail.sendingMailData(mailData);
            return res.json({
                status: 'success',
                message: 'Email sent successfully',
                email_sended: emailStatus?.status,
                token_insertion,
            });
        } else {
            return res.json(token_insertion);
        }
    } catch (error) {
        console.error("Error during forgot password process:", error);
        return res.json({
            status: 'error',
            message: 'An error occurred while processing your request',
            error: error.message || error,
        });
    }

}
const AuthorResetPasswordController = async (req, res) => {
    try {
        const { password, token } = req.body;
        let makingHasedToken = crypto.createHash("sha256").update(token).digest("hex");
        let reset_password = await AuthorAuthModels.ResettingPassword(makingHasedToken, password);
        if (reset_password?.getToken) {
            return res.json(reset_password?.getToken)
        }
        if (reset_password.status) {
            return res.json(reset_password);
        }
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}

const CheckingResetToken = async (req, res) => {
    const { token } = req.query;
    let makingHasedToken = crypto.createHash("sha256").update(token).digest("hex");
    let valid_token = await AuthorAuthModels.checkingTheTokensAreValid(makingHasedToken);
    if (valid_token?.status) {
        return res.json({
            status: true,
            message: "Token is valid"
        });
    } else {
        return res.json(valid_token)
    }
}
module.exports = {
    AuthorLogin,
    AuthorLogout,
    AuthorRegister,
    AuthorForgotPassword,
    AuthorResetPasswordController,
    CheckingResetToken
}