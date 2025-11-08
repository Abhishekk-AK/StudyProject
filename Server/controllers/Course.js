const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price , category, tag, instructions} = req.body;

        //get thumbnail from temp local server temporarily stored by cloudinary
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!category) {
            return res.status(400).json({
                success:false,
                message:'Category is required.'
            })
        }
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !instructions || !thumbnail) {
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
            thumbnail: thumbnailImage.secure_url,
            tag: tag,
            instructions: instructions
        })

        //add new course to the userschema of instructor
        await User.findByIdAndUpdate(
            instructorDetails._id,
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
                                                .populate("instructor", "firstName lastName image");

        //if no course found
        if(allCourses.length === 0) {
            return res.status(200).json({
                success:true,
                hasData:false,
                message:'No courses found.',
                allCourses
            })
        }

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


//get courseDetails
exports.getCourseDetails = async (req, res) => {
    try {
        const {courseId} = req.body;

        if(!courseId) {
            return res.status(400).json({
                success:false,
                message:'Course id required.'
            })
        }

        const courseDetails = await Course.findById(courseId, 
                                                {
                                                // _id: 0,
                                                // courseName: 1,
                                                // courseDescription:1,
                                                // instructor: 1,
                                                // whatYouWillLearn: 1,
                                                // courseContent: 1,
                                                // rating: 1,
                                                // price: 1,
                                                // thumbnail: 1,
                                                // tag: 1,
                                                // category: 1,
                                                // studentsEnrolled: 1
                                                }
                                            )
                                            .populate("instructor", "firstName lastName image")
                                            .populate("ratingAndReviews")
                                            .populate("category", "name")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subsection"
                                                }
                                            });

        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Course not found with this ${courseId}.`
            })
        }

        return res.status(200).json({
            success:true,
            message:'Course details fetched successfully.',
            data:courseDetails
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while getting course details.'
        })
    }
}