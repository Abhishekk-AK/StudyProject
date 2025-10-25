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


exports.categoryPageDetails = async (req, res) => {
    try {
        const {categoryId} = req.body;

        //get all courses for the specified category
        const selectedCategory = await Category.findById(categoryId).populate("courses");

        console.log(selectedCategory);

        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'Category not found.'
            })
        }

        //if ther is no courses in the category
        if(selectedCategory.courses.length === 0) {
            console.log('No courses for this category.');

            return res.status(404).json({
                success:false,
                message:'No courses found for the selected category.'
            })
        }

        //get courses for different category
        const differentCategories = await Category.find({
                                                        _id: {$ne: categoryId}
                                                    })
                                                    .populate("courses")

        //top selling courses in categories
        const allCategories = await Category.find().populate('courses');
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
                                    .sort((a,b) => b.sold-a.sold)
                                    .slice(0,10)

        //return response
        return res.status(200).json({
            selectedCategory: selectedCategory,
            differentCategories: differentCategories,
            mostSellingCourses: mostSellingCourses,
            success:true,
            message:'Category detail page working successfully.'
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'Somethin went wong while fetching category details.',
            error:err.message
        })
    }
}