const { LoginSchema } = require("../../utils/validators/AuthValidator");
const AdminAuthModels = require("../../models/auth/admin.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto")
const EmailController = require("../../email/Email.controller");
const sendAdminEmail = new EmailController();
const { ForgotPasswordTemplate } = require("../../email/Template")
const { format, add } = require("date-fns")

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

const AdminForgotPassword = async (req, res) => {
    let time = format(add(new Date(), { minutes: 10 }), 'yyyy-MM-dd HH:mm:ss');
    const { email } = req.body;
    try {
        // Generate token and hash it
        const token = crypto.randomBytes(20).toString('hex');
        const hashedResetToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        let token_insertion = await AdminAuthModels.insertForgotTokens(hashedResetToken, email, 'admin', time);
        if (token_insertion?.status) {
            const mailData = {
                to_user: email,
                subject: 'Forgot Password',
                html: ForgotPasswordTemplate(token, email, time,'admin'),
            };

            // Send email
            let emailStatus = await sendAdminEmail.sendingMailData(mailData);
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
};

const AdminResetPasswordController = async (req, res) => {
    try {
        const { password, token } = req.body;
        let makingHasedToken = crypto.createHash("sha256").update(token).digest("hex");
        let reset_password = await AdminAuthModels.ResettingPassword(makingHasedToken, password);
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
    let valid_token = await AdminAuthModels.checkingTheTokensAreValid(makingHasedToken);
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
    AdminLogin,
    AdminLogout,
    AdminForgotPassword,
    AdminResetPasswordController,
    CheckingResetToken
}