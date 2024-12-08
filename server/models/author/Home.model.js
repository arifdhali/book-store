const BaseModal = require("../Base.model");

class AuthorModels extends BaseModal {

    async Dashboard() {
        console.log('author home model');
    }

}

module.exports = new AuthorModels();