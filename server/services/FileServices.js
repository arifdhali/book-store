const fs = require('fs');
const { unlink } = require("fs/promises");
const path = require("path");

class FileServices {
    async deleteFile(fileName, folderName) {
        try {
            let setFileName = path.join("public", "uploads", folderName, fileName);
            if (!fs.existsSync(setFileName)) {
                return {
                    message: `File does not exists in ${folderName}`,
                }
            }
            await unlink(setFileName);
        } catch (error) {
            console.error(`Error deleting file: ${fileName}`, error);
            throw error;
        }
    }
}

module.exports = new FileServices();
