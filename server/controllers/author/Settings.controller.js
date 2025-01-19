const SettingModel = require("../../models/author/Settings.model");
const Setting = new SettingModel("author");

const SettingController = async (req, res) => {
    try {
        const { userID } = req.query;
        if (!userID) {
            return res.status(400).json({
                status: false,
                message: "User ID is required",
            });
        }
        const result = await Setting.GetInformationOfUsers(userID)
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in SettingController:", error.message);
        return res.status(500).json({
            status: false,
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

module.exports = {
    SettingController,
};
