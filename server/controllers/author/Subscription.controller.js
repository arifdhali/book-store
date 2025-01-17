const SubscriptionModel = require("../../models/author/Subscription.model")
const Subscription = new SubscriptionModel('subscription');
const GetSubscription = async (req, res) => {
    try {
        const { user_id } = req.query
        if (!user_id || user_id == '') {
            throw new Error("User id is required")
        }
        let info = await Subscription.getSubscription(user_id);
        return res.json(info)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    GetSubscription
}