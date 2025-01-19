const BaseModal = require("../Base.model");

class Orders extends BaseModal {
    constructor(tableName) {
        super()
        this.tableName = tableName
    }

    async getAllOrdersByUser(id) {

        try {
            let selectSql = `SELECT
                        AOR.order_id, U.username as username, B.name as book_title, AO.quantity as order_quantity, AO.total_price, AO.order_date, AO.status
                        FROM author_orders_relations AOR
                        JOIN author_orders AO
                        ON AO.order_id = AOR.order_id
                        JOIN users U
                        ON U.id = AO.user_id
                        JOIN book B
                        ON AO.book_id = B.id
                        WHERE AOR.author_id = ?`;

            let result = await this.preparingQuery(selectSql, [id])
            if (Array.isArray(result) && result.length > 0) {
                let orders = result;
                return {
                    status: true,
                    message: "Order fetch success",
                    orders
                }
            } else {
                return {
                    status: false,
                    message: "No orders found with the provided ID.",
                };
            }
        } catch (error) {
            console.error("Error in getAllOrdersByUser:", error.message);
            return {
                status: false,
                message: "An error occurred while fetching orders information.",
                error: error.message,
            };
        }

    }

}

module.exports = Orders;