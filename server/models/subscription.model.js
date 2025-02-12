const BaseModal = require("./Base.model");
class Subscription extends BaseModal {


    async setSubscriptionsPack(authorID, subscription_type) {
        try {
            const subscriptionFeatures = {}
            switch (subscription_type) {
                case 'free':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 0,
                        bookQuantity: 10,
                        book_limit: 10,
                        coupons_limit: 10,
                        orderMargin: "30%"
                    })
                    break;
                case 'standard':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 399,
                        bookQuantity: 40,
                        book_limit: 30,
                        coupons_limit: 20,
                        orderMargin: "20%"
                    })
                    break;
                case 'premium':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 699,
                        bookQuantity: null,
                        book_limit: null,
                        coupons_limit: null,
                        orderMargin: null,
                    })
                    break;
                default:
                    throw new Error("Invalid subscription type. Must be 'free', 'standard', or 'premium'.");
            }
            let insertSubscriptionSql = `INSERT INTO subscription (author_id,subscription_type,subscription_price,book_quantity,book_limit,coupons_limit,order_margin) VALUES(?,?,?,?,?,?,?)`;
            const { bookQuantity, subscription_price, book_limit, coupons_limit, orderMargin } = subscriptionFeatures;
            let subscriptionResult = await this.preparingQuery(insertSubscriptionSql, [authorID, subscription_type, subscription_price, bookQuantity, book_limit, coupons_limit, orderMargin]);
            if (subscriptionResult.affectedRows) {
                return {
                    status: true,
                }               
            }
        } catch (error) {
            return error;
        }
    }
    // async insertIdToSubscriptionAuthorRelations(authorID, subsctionID) {
    //     try {
    //         let tableName = `subscription_author_relation`;
    //         if (!authorID && !subsctionID) {
    //             throw new Error("Insert id not found")
    //         }
    //         let insertSql = `INSERT INTO ${tableName} (author_id,subscription_id ) VALUES(?,?)`;
    //         return await this.preparingQuery(insertSql, [authorID, subsctionID])
    //     } catch (error) {
    //         console.error("Error in when  inserting into subsctiption realtion  " + error);
    //         return { status: false, message: error.message };
    //     }
    // }

}
module.exports = new Subscription();