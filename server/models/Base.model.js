const connection = require("../config/dbconfig");
class BaseModal {
    // process final sql
    #ProcessDatabase(query, data) {
        return new Promise((resolve, reject) => {

        })
    }

    // preparing the query
    preparingQuery(query, processData) {
        return this.#ProcessDatabase(query, processData)
    }

}

module.exports = BaseModal;