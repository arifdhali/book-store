const Ordermodel = require("../../models/author/Order.model");
let order = new Ordermodel("author_orders")
const GetOrderContoller = async (req, res) => {
    try {
        const { userID } = req.query;
        if (!userID) {
            throw new Error("User id is required to get orders");
        }
        let result = await order.getAllOrdersByUser(userID);
        if (result) {
            return res.json(result)
        } else {
            throw new Error("Results not found in the controller");
        }
    } catch (error) {
        return res.json(error);
    }



}
module.exports = {
    GetOrderContoller
}