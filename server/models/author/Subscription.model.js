const BaseModal = require("../Base.model");

class SubscriptionModel extends BaseModal {
    constructor(tableName) {
        super();
        this.tableName = tableName
    }

    async getSubscription(id) {
        try {
            const subscriptionSql = `SELECT * FROM subscription WHERE author_id = ?`;
            const subscription_details = await this.preparingQuery(subscriptionSql, [id]);

            if (subscription_details.length > 0) {
                return {
                    status: true,
                    message: 'Subscription retrieved successfully',
                    subscription_details,
                };
            } else {
                throw new Error("No subscription found for the provided ID");
            }
        } catch (error) {
            throw error;
        }
    }
}
module.exports = SubscriptionModel;