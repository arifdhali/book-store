const multer = require("multer");
const path = require("path");
const fs = require('fs');

const multerStorgeHandle = (folderName) => {
    let setFolderName = path.join("public", "uploads", folderName);
    if (!fs.existsSync(setFolderName)) {
        fs.mkdirSync(setFolderName, {
            recursive: true,
        })
    }
    const storage = multer.diskStorage({
        destination: function (req, res, cb) {
            return cb(null, setFolderName);
        },
        filename: (req, file, cb) => {
            return cb(
                null,
                `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}-${file.fieldname}-${file.originalname}`
            );
        },
    });
    return storage;
};

const uploadMulter = (folder) => {
    return multer({
        storage: multerStorgeHandle(folder),
    });
};

module.exports = uploadMulter;