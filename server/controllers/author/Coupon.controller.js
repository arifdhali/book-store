const Coupons = require("../../models/author/Coupon.model");
const CouponsModels = new Coupons("coupons")
const AddCouponController = async (req, res) => {
    const { book_id, code, where_to_apply, discount, start_date, expire_date, status } = req.body;
    const data = {
        book_id,
        code,
        where_to_apply,
        discount,
        start_date,
        expire_date,
        status,
    }
    console.log(req.body)
    let result = await CouponsModels.addCoupon(data)
    return res.json(result);

}

module.exports = {
    AddCouponController,
}