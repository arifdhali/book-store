const connection = require("../config/dbconfig");
class BaseModal {

    // MAKE THIS PRIVATE FOR OTHERS CONTROLLERS
    #ProcessDatabase(query, data) {
        return new Promise((resolve, reject) => {
            connection.query(query, data, (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            })
        })

    }
    // making this for usage processDatabase
    preparingQuery(query, processData = null) {
        return this.#ProcessDatabase(query, processData);
    }


}

module.exports = BaseModal;