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

            if (Array.isArray(subscription_details) && subscription_details.length > 0) {
                return {
                    status: true,
                    message: 'Subscription retrieved successfully',
                    subscription_details,
                };
            } else {
                return {
                    status: false,
                    message: "No subscription found with the provided ID.",
                };
            }
        } catch (error) {
            console.error("Error in getSubscription:", error.message);
            return {
                status: false,
                message: "An error occurred while fetching user information.",
                error: error.message,
            };
        }
    }
}
module.exports = SubscriptionModel;