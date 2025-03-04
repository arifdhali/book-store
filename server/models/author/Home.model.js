const BaseModal = require("../Base.model");

class HomeModelsAuthor extends BaseModal {
    constructor(tableName, id) {
        super(),
            this.tableName = tableName,
            this.userId = id
    }
    async Dashboard(userID) {
        try {
            if (!userID) throw new Error("Author id is required");
            let authorSql = ` SELECT 
                A.id, A.name, A.email, A.profile_img, A.status, S.subscription_type,
                COUNT(DISTINCT B.id) AS book_count,
                COUNT(DISTINCT C.id) AS coupons_count,
                COUNT(DISTINCT O.id) AS order_count
            FROM author A
            LEFT JOIN subscription S ON A.id = S.author_id
            LEFT JOIN book B ON A.id = B.author_id
            LEFT JOIN coupons C ON A.id = C.author_id
            LEFT JOIN author_orders_relations O ON A.id = O.author_id
            WHERE A.id = ?`;
            let author = await this.preparingQuery(authorSql, [userID]);
            if (author[0]) {
                const { book_count, coupons_count, order_count, ...authors } = author[0];
                return {
                    status: true,
                    message: "Dashboard data retrieved successfully",
                    authors: {
                        ...authors,
                        count: {
                            book_count,
                            coupons_count,
                            order_count
                        }
                    }
                }
            } else {
                throw new Error(`Provided id=${userID} is not correct`);
            }
        } catch (error) {
            console.error("Error in Author Dashboard :", error);
            return {
                status: false,
                message: "An error occurred while author Dashboard.",
                error: error.message,
            };
        }
    }

}

module.exports = new HomeModelsAuthor('author');