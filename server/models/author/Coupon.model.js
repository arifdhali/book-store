const BaseModal = require("../Base.model");

class Coupns extends BaseModal {
    constructor(tableName) {
        super()
        this.tableName = tableName
    }
    async addCoupon(couponInfo) {
        try {
            const dbColumn = {
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

}

module.exports = Coupns;