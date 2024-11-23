const AddSchema = require('../../utils/validators/Add');
const CatgoryModel = require("../../models/admin/category.model");
const InstanceOfModel = new CatgoryModel();
const AddCategoryController = async (req, res) => {
    const { name, description } = req.body;
    const { error } = AddSchema.validate({ name, description });
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            status: false,
        })
    }

    const existsCategory = await InstanceOfModel.checkCategory(name)
    if (existsCategory.length > 0) {
        const result = {
            status: false,
            message: "Category already exists",
        }
        return res.status(401).json({
            result
        });
    }

    let result = await InstanceOfModel.addCategory(name, description);
    return res.status(201).json({
        result,
    })
}

module.exports = {
    AddCategoryController,
}
