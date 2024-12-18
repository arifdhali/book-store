const HomeModel = require("../../models/author/Home.model")

const HomepageController = (req, res) => {
    return res.json({        
        user_info: req.user

    })
    HomeModel.Dashboard();

}


module.exports = HomepageController;