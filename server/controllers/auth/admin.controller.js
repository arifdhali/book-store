const { LoginSchema } = require("../../utils/validators/AdminValidator");
const AdminAuthModels = require("../../models/auth/auth.model");



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
    const adminAuth = new AdminAuthModels(email);

    // sending to the Login models
    const data = {
        email,
        password
    }
    let resul = await adminAuth.LoginModels(data);
    res.json(
        resul
    )

}


module.exports = {
    AdminLogin
}