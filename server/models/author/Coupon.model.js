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
            }
        } catch (error) {
            return {
                status: false,
                message: error.message,
            }

        }
    }

    async getCoupons([authorID]) {
        try {
            let getSql = `SELECT C.id,C.code,C.discount,C.where_to_apply,C.status,C.expire_date
            FROM ${this.tableName} C                                            
            WHERE author_id = ? `;
            let coupons = await this.preparingQuery(getSql, authorID)
            if (coupons.length > 0) {
                return {
                    status: true,
                    coupons,
                    mesage: "Coupon get success",
                }
            } 
        } catch (error) {
            throw error;
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
            }
        } catch (error) {
            throw error;
        }

    }

}

module.exports = Coupns;