const BaseModal = require("../Base.model");

class SubscriptionModel extends BaseModal {
    constructor(tableName) {
        super();
        this.tableName = tableName
    }

    async getSubscription() {
        console.log(this.tableName);
    }
}
module.exports = SubscriptionModel;