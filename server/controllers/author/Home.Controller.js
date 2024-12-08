const authorModel = require("../../models/author/Home.model")

const HomepageController = (req, res) => {
    return res.json({        
        user_info: req.user

    })
    authorModel.Dashboard();

}


module.exports = HomepageController;