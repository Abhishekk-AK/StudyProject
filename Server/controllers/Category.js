const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const {name, description} = req.body;

        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:'All fiels are required.'
            })
        }

        //create entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description
        })
        console.log(categoryDetails);

        return res.status(200).json({
            success:true,
            message:'Category created successfully.'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while creating category.'
        })
    }
}


exports.showAllCategorys = async (req, res) => {
    try {
        const allCategorys = await Category.find({}, {name:true, description:true});

        return res.status(200).json({
            success:true,
            message:'All categorys returned successfully.',
            allCategorys
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while showing all categorys.'
        })
    }
}