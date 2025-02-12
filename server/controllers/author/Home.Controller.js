const HomeModel = require("../../models/author/Home.model")
const HomepageController = async (req, res) => {
    try {
        const { user_id } = req.user.data;
        let homepage = await HomeModel.Dashboard(user_id);
        return res.json(homepage);
    } catch (error) {
        return res.json(error)
    }
}


module.exports = HomepageController;