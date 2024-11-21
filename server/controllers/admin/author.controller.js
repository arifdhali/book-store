const AuthorModelController = require('../../models/admin/author.model');
const AuthorModel = new AuthorModelController();
const AddSchema = require('../../utils/validators/Add');
var generator = require('generate-password');
const EmailController = require("../../email/Email.controller");
const { LoginTemplate } = require('../../email/Template');
const sendAuthormail = new EmailController();
const AddAuthorController = async (req, res) => {
    const status = false;
    try {
        const thumbnail = req.file;
        if (!thumbnail) {
            return res.json({
                status: false,
                message: "No thumbnail uploaded",
            });
        }
        const author_image = thumbnail.filename;

        const { author_name, email, bio, premiumStatus } = req.body;
        // generate passwords for author
        const password = generator.generate({
            length: 10,
            numbers: true,
            strict: true,
            symbols: true,
        })
        const data =
            [author_name,
                email,
                author_image,
                bio,
                password
            ]
        const result = await AuthorModel.addAuthor(data);
        const maildata = {
            to_user: email,
            subject: "Your Account created successfully",
            html: LoginTemplate(email, password, new Date())
        }
        sendAuthormail.sendingMailData(maildata);
        return res.status(201).json({
            result
        });
    } catch (err) {
        console.log(err);
    }

    res.json({
        status: true,
    })

}


// GET ALL AUTHORS
const GetAllAuthorsController = async (req, res) => {
    const status = 'active';
    let result = await AuthorModel.getAuthors(status);
    return res.json({
        result
    });

}





module.exports = {
    AddAuthorController,
    GetAllAuthorsController
}