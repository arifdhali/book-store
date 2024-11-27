const AuthorModel = require('../../models/admin/author.model');
const AddSchema = require('../../utils/validators/Add');
var generator = require('generate-password');
const EmailController = require("../../email/Email.controller");
const { LoginTemplate } = require('../../email/Template');
const sendAuthormail = new EmailController();
const bcrypt = require('bcrypt');
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

        const exitsUsers = await AuthorModel.checkUserExists(email);
        if (exitsUsers.length > 0) {
            const result = {
                status: false,
                message: "Email already exists",
            }
            return res.status(401).json({

                result
            });
        }
        // generate passwords for author
        const password = generator.generate({
            length: 10,
            numbers: true,
            strict: true,
            symbols: true,
        })
        let hashed_password = await bcrypt.hash(password, 10);
        const data =
            [author_name,
                email,
                author_image,
                bio,
                hashed_password
            ]
        const result = await AuthorModel.addAuthor(data);
        const maildata = {
            to_user: email,
            subject: "Your Account created successfully",
            html: LoginTemplate(email, password, new Date())
        }
        const emailStatus = await sendAuthormail.sendingMailData(maildata);
        // console.log(emailStatus);
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