const SubscriptionModel = require("../../models/author/Subscription.model")
const Subscription = new SubscriptionModel('subscription');
const GetSubscription = async (req, res) => {
    console.log(req.query);
    const { userID } = req.params
    if (!userID || userID == '') {
        throw new Error("User id is required")
    }

    await Subscription.getSubscription();
}
module.exports = {
    GetSubscription
}