const BaseModal = require("../Base.model");
const bcrypt = require('bcrypt');
const AuthorModels = require("../admin/author.model");
const subscriptionModel = require("../subscription.model");
const SocketManager = require("../../utils/socket/Sockets.Manager")
const Notification = require("../notification/notification.model")
const NotificationModel = new Notification('notification');
class AuthorAuthModels extends BaseModal {

    async LoginModels(data) {
        const { email, password } = data;
        let sql = `
        SELECT A.id,A.name, A.password, A.status, S.subscription_type
        FROM author A
        JOIN subscription S
        ON A.id = S.author_id
        WHERE A.email = ? `;
        try {
            const [user] = await this.preparingQuery(sql, [email]);
            if (!user) {
                return {
                    message: "User not found",
                    status: false
                };
            }
            const { status } = user;
            if (status !== 'active') {
                return {
                    message: `Your account is ${status}, please contact to the Admin`,
                    status: false
                };
            }

            const userinfo = {
                user_id: user.id,
                user_name: user.name,
                user_status: user.status,
                subscription_type: user.subscription_type,
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    message: "Incorrect password",
                    status: false
                };
            }
            const updateSql = "UPDATE author SET last_active = NOW() WHERE email = ?";
            await this.preparingQuery(updateSql, [email])

            return {
                message: "Login successful",
                status: true,
                role: 'author',
                userinfo
            };

        } catch (error) {
            console.error("Error in Author Auth modal " + error);
            return { success: false, message: "Database error" };
        }
    }

    async RegisterModel(data) {
        const { first_name, last_name, email, profile, hasedPassword } = data;
        try {
            let dbColum = {
                name: first_name,
                first_name: first_name,
                last_name: last_name,
                email: email,
                profile_img: profile,
                password: hasedPassword

            }
            let columnName = Object.keys(dbColum).join(",");
            let columnValues = Object.values(dbColum)
            let placeHolder = columnValues.map(() => '?').join(', ')
            let user = await AuthorModels.checkUserExists(email)
            if (!user.status) {
                return user;
            } else {
                const insersql = `INSERT INTO author(${columnName}) VALUES(${placeHolder})`
                let response = await this.preparingQuery(insersql, columnValues)
                const authorID = response.insertId;
                let subscription = await subscriptionModel.setSubscriptionsPack(authorID, 'free');
                if (subscription.status) {
                    let socketSql = `SELECT id, name, profile_img, created_at FROM author WHERE id = ?`;
                    let socketResult = await this.preparingQuery(socketSql, [authorID])
                    if (socketResult.length > 0) {
                        const socketData = socketResult.map(item => (
                            {
                                ...item,
                                message: `${item.name} is registered`
                            }
                        ))
                        let notification = await NotificationModel.createNotification('new-author-register', `${socketResult[0].name} is registered`, authorID, 'author',);
                        if (notification.status) {
                            SocketManager.sendingLiveUpdate('new-author-register', socketData)
                        }
                    }
                    return {
                        message: "Your account has been successfully created.",
                        status: true
                    }
                }
            }
        } catch (error) {
            console.error("Error in Author Auth Register: " + error);
            return { success: false, message: "Database error" };
        }
    }

}

module.exports = new AuthorAuthModels();
