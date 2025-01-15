const AddSchema = require('../../utils/validators/Add');
const CatgoryModel = require("../../models/admin/category.model");
const AddCategoryController = async (req, res) => {
    const { name, description } = req.body;
    const { error } = AddSchema.validate({ name, description });
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            status: false,
        })
    }

    const existsCategory = await CatgoryModel.checkCategory(name)
    if (existsCategory.length > 0) {
        const result = {
            status: false,
            message: "Category already exists",
        }
        return res.status(401).json({
            result
        });
    }

    let result = await CatgoryModel.addCategory(name, description);
    return res.status(201).json({
        result,
    })
}


const AllCategoryController = async (req, res) => {

    let result = await CatgoryModel.getCategories();
    return res.json({
        result
    })



}
const DeleteCategoryController = async (req, res) => {
    try {
        const { cat_ID } = req.params;
        if (!cat_ID) {
            throw new Error("Category id is required");
        }
        let result = await CatgoryModel.delteCategory(cat_ID)
        return res.json(result)
    } catch (error) {
        return res.json(error);
    }
}
module.exports = {
    AddCategoryController,
    AllCategoryController,
    DeleteCategoryController
}
