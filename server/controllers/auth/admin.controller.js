const { LoginSchema } = require("../../utils/validators/AdminValidator");
const AdminModels = require("../../models/auth/auth.model");



const AdminLogin = async (req, res) => {

    const { error } = LoginSchema.validate(req.body);

    console.log(error.details[0].message);
}


module.exports = {
    AdminLogin
}