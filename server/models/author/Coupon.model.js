const BaseModal = require("../Base.model");

class Coupns extends BaseModal {
    constructor(tableName) {
        super()
        this.tableName = tableName
    }
    async addCoupon(couponInfo) {
        try {
            const dbColumn = {
                author_id: couponInfo.user_id,
                book_id: couponInfo.book_id,
                code: couponInfo.code,
                discount: couponInfo.discount,
                where_to_apply: couponInfo.where_to_apply,
                status: couponInfo.status,
                start_date: couponInfo.start_date,
                expire_date: couponInfo.expire_date,

            }
            // check the count of code based on the subscription
            let checkCountSql = `SELECT C.author_id,COUNT(C.author_id) as coupons_count, S.coupons_limit as max_coupons
                                FROM coupons C            
                                JOIN subscription S
                                ON C.author_id = S.author_id
                                WHERE C.author_id = ? AND S.subscription_type = ?
                                GROUP BY C.author_id,S.coupons_limit         
                                `
            let subscriptionType = couponInfo.subscription_type;
            let limitQuery = await this.preparingQuery(checkCountSql, [couponInfo.user_id, subscriptionType]);
            if (limitQuery[0]) {
                const { coupons_count, max_coupons } = limitQuery[0]
                if (coupons_count >= max_coupons) {
                    return {
                        status: false,
                        message: "You have reached the maximum limit to add a coupons"
                    };
                }
            }

            const columns = Object.keys(dbColumn).join(",");
            const placeholders = Object.keys(dbColumn).map(() => "?").join(", ");
            const values = Object.values(dbColumn);
            const addSql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
            let result = await this.preparingQuery(addSql, values)
            if (result.affectedRows >= 1) {
                return {
                    status: true,
                    message: "Coupon added successfully",
                }
            } else {
                return {
                    status: false,
                    message: "No coupons found with the provided ID.",
                };
            }
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return {
                    status: false,
                    message: "A coupon with this code already exists. Please use a unique code.",
                    error: error.message
                };
            }
            return {
                status: false,
                message: "An error occurred while adding the coupons to the database.",
                error: error.message,
            }
        }
    }

    async getCoupons(authorID) {
        try {
            let getSql = `SELECT C.id,C.code,C.discount,C.where_to_apply,C.status,C.expire_date
            FROM ${this.tableName} C                                            
            WHERE author_id = ? `;
            let coupons = await this.preparingQuery(getSql, [authorID])
            if (Array.isArray(coupons) && coupons.length > 0) {
                return {
                    status: true,
                    coupons,
                    mesage: "Coupon get success",
                }
            } else {
                return {
                    status: false,
                    message: "No coupons found with the provided ID.",
                };
            }
        } catch (error) {
            return {
                status: false,
                message: "An error occurred while fetching coupons.",
                error: error.message,
            }
        }
    }

    async deleteCoupons(id) {
        try {
            let delteSql = `DELETE from ${this.tableName} WHERE id = ?`;
            let res = await this.preparingQuery(delteSql, [id])
            if (res.affectedRows > 0) {
                return {
                    status: true,
                    message: "Coupon delete successfully"
                }
            } else {
                return {
                    status: false,
                    message: "No coupons found with the provided ID.",
                };
            }
        } catch (error) {
            return {
                status: false,
                message: "An error occurred while deleting coupons.",
                error: error.message,
            }
        }

    }

}

module.exports = Coupns;