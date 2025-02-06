const BaseModal = require("../Base.model");

class NotifiationModel extends BaseModal {

    constructor(tableName) {
        super();
        this.tableName = tableName
    }

    async createNotification(type, message, realatedID, relatedType) {
        try {
            let createNotiSql = `INSERT INTO ${this.tableName}(type,message,related_id,related_type) VALUE(?,?,?,?)`;
            let result = await this.preparingQuery(createNotiSql, [type, message, realatedID, relatedType])
            if (result.affectedRows > 0) {
                return result;
            } else {
                throw Error("Couldn't saved to database")
            }
        } catch (error) {
            return {
                status: false,
                message: error
            }
        }

    }

}
module.exports = NotifiationModel;