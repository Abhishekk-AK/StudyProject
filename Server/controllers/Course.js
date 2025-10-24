const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price , category} = req.body;

        //get thumbnail from cloudinary
        const thumbnail = req.files.thumbnailImage;
        console.log('thumbnail to check its source:', thumbnail)

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success:false,
                message:'All fields are required.'
            })
        }

        //check for instructor to store in DB
        //res.user.id = we take id from payload during auth
        const userId = req.user.id;
        console.log('userId:', userId);
        //instructor object id
        const instructorDetails = await User.findById(userId);
        console.log('instructorDetails:', instructorDetails._id);

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:'Instructor details not found.'
            })
        }

        //check given category is valid or not
        //getting category id from req.body = {category}
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category details not found.'
            })
        }

        //upload images to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price: price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url
        })

        //add new course to the userschema of instructor
        await User.findByIdAndUpdate(
            {id: instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true}
        )

        //update category schema
        await Category.findByIdAndUpdate(
            category,
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new:true}
        )


        //return response
        return res.status(200).json({
            success:true,
            message:'Course has been created successfully.',
            data:newCourse
        })


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while creating the course.',
            error:err.message
        })
    }
}


//get all coursess
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {courseName:true, 
                                                    price:true,
                                                    thumbnail:true, 
                                                    instructor:true,
                                                    ratingAndReviews:true, 
                                                    studentsEnrolled:true
                                                })
                                                .populate("instructor");

        return res.status(200).json({
            success:true,
            message:'All courses data fetched successfully.',
            allCourses
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while showing all courses.',
            error:err.message
        })
    }
}