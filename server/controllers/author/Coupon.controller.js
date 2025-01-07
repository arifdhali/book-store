const Coupons = require("../../models/author/Coupon.model");
const CouponsModels = new Coupons("coupons")
const AddCouponController = async (req, res) => {
    try {
        const { user_id } = req.query;
        const { book_id, code, where_to_apply, discount, start_date, expire_date, status } = req.body;
        if (!book_id || !user_id) {
            throw new Error("book id & author id is required to add coupons");
        }
        const data = {
            user_id,
            book_id,
            code,
            where_to_apply,
            discount,
            start_date,
            expire_date,
            status,
        }
        let result = await CouponsModels.addCoupon(data)
        return res.json(result);
    } catch (error) {
        throw error
    }
}

// get all coupons
const GetAllCoupons = async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            throw new Error("User id is required to get coupons");
        }
        let result = await CouponsModels.getCoupons(user_id);
        if (result) {
            const { coupons, status, mesage } = result;
            return res.json({
                status,
                coupons,
                mesage
            })
        }
    } catch (error) {
        throw error;
    }

}

const DeleteCouponsController = async (req, res) => {
    try {

        const { couponID } = req.params;
        if (!couponID) {
            throw new Error("Coupon id is required to delete");
        }
        let result = await CouponsModels.deleteCoupons(couponID);
        return res.json(result)
    } catch (error) {
        throw error;
    }
}

module.exports = {
    AddCouponController,
    GetAllCoupons,
    DeleteCouponsController
}