const BaseModal = require("./Base.model");
const { format, add } = require("date-fns");

class Subscription extends BaseModal {

    constructor(table) {
        super();
        this.tableName = table;
    }

    /**
     * Sets subscription package for the given author.
     * @param {number} authorID - Author ID
     * @param {string} subscription_type - Type of subscription ('free', 'standard', or 'premium')
     * @returns {Object} - Status of subscription insertion
     */
    async setSubscriptionsPack(authorID, subscription_type) {
        try {
            const subscriptionFeatures = {};
            const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
            switch (subscription_type) {
                /**
                 * Subscription Details:
                 * free = 1 month
                 * standard = 2 months 
                 * premium = 3 months 
                */
                case 'free':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 0,
                        bookQuantity: 10,
                        book_limit: 10,
                        coupons_limit: 10,
                        orderMargin: "30%",
                        start_date: currentDate,
                        end_date: format(add(new Date(), { months: 1 }), 'yyyy-MM-dd HH:mm:ss')
                    });
                    break;

                case 'standard':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 399,
                        bookQuantity: 40,
                        book_limit: 30,
                        coupons_limit: 20,
                        orderMargin: "20%",
                        start_date: currentDate,
                        end_date: format(add(new Date(), { months: 2 }), 'yyyy-MM-dd HH:mm:ss')
                    });
                    break;

                case 'premium':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 699,
                        bookQuantity: null,
                        book_limit: null,
                        coupons_limit: null,
                        orderMargin: null,
                        start_date: currentDate,
                        end_date: format(add(new Date(), { months: 3 }), 'yyyy-MM-dd HH:mm:ss')
                    });
                    break;

                default:
                    throw new Error("Invalid subscription type. Must be 'free', 'standard', or 'premium'.");
            }

            const { bookQuantity, subscription_price, book_limit, coupons_limit, orderMargin, start_date, end_date } = subscriptionFeatures;

            // Prepare columns and values for SQL insertion
            const dbColumns = {
                author_id: authorID,
                subscription_type: subscription_type,
                subscription_price: subscription_price,
                book_quantity: bookQuantity,
                book_limit: book_limit,
                coupons_limit: coupons_limit,
                order_margin: orderMargin,
                start_date: start_date,
                end_date: end_date
            };

            const columnName = Object.keys(dbColumns).join(",");
            const columnValues = Object.values(dbColumns);
            const placeHolder = columnValues.map(() => "?").join(",");

            // Insert subscription data
            const insertSubscriptionSql = `INSERT INTO ${this.tableName} (${columnName}) VALUES(${placeHolder})`;
            const subscriptionResult = await this.preparingQuery(insertSubscriptionSql, columnValues);

            if (subscriptionResult.affectedRows) {
                return {
                    status: true,
                    message: "Subscription successfully created."
                }
            } else {
                throw new Error("Failed to create subscription.");
            }
        } catch (error) {
            console.error("Error in setSubscriptionsPack:", error);
            return {
                status: false,
                message: error.message
            }
        }
    }

    /**
     * Checks if the subscription is active or expired.
     * @param {number} id - Author ID
     * @returns {Object} - Subscription status
     */
    async checkSubscriptionActiveOrNot(authorID) {
        try {
            let checkSql = `SELECT id,subscription_type,author_id,status, end_date FROM ${this.tableName} WHERE author_id = ? AND NOW() >= end_date`;
            let subscriptionStatus = await this.preparingQuery(checkSql, [authorID]);

            if (subscriptionStatus.length > 0) {
                const { id, status, subscription_type, end_date } = subscriptionStatus[0];
                if (status === 'active') {
                    let updateStatusSql = `UPDATE ${this.tableName} SET status = ? WHERE id = ? AND author_id = ?`;
                    await this.preparingQuery(updateStatusSql, ['inactive', id, authorID]);
                }
                const subscription_detail = {
                    status: false,
                    message: "Subscription is expired",
                    subscription_type,
                    end_date
                }
                return subscription_detail;
            }

            return {
                status: true,
                message: "Subscription is active"
            }
        } catch (err) {
            console.error('Error on checkSubscriptionActiveOrNot:', err);
            return {
                status: false,
                message: err.message
            }
        }
    }

}

module.exports = new Subscription('subscription');
