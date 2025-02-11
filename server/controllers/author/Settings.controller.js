const { response } = require("express");
const SettingModel = require("../../models/author/Settings.model");
const Setting = new SettingModel("author");
const bcrypt = require("bcrypt");

const GetSettingController = async (req, res) => {
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
        console.error("Error in GetSettingController:", error.message);
        return res.status(500).json({
            status: false,
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};
const UpdateSettingController = async (req, res) => {
    try {

        const thumbnail = req.file;
        const { userID } = req.query;
        const filteredValue = {};
        Object.assign(filteredValue, req.body);
        if (thumbnail) {
            filteredValue.profile_img = thumbnail.filename
        }
        let update = await Setting.UpdateInformationOfUsers(userID, filteredValue);
        //req.user.data.user_profile = thumbnail.filename;
        return res.json(update);
    } catch (error) {
        console.error("Error in UpdateSettingController:", error.message);
        return res.status(500).json({
            status: false,
            message: "An unexpected error occurred",
            error: error.message,
        });
    }


}
module.exports = {
    GetSettingController,
    UpdateSettingController
};
