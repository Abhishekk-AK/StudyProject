const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

exports.updateProfile = async (req, res) => {
    try {
        //get data
        const {
            firstName='',
            lastName='',
            dateOfBirth='',
            about='',
            contactNumber,
            gender
        } = req.body;

        //get userId
        const id = req.user.id;

        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update user
        const user = await User.findByIdAndUpdate(
                                                    id,
                                                    {
                                                        firstName,
                                                        lastName
                                                    },
                                                    {new:true}
                                                )

        await user.save()

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        const updatedUser = await User.findById(id).populate('additionalDetails')

        //return response
        return res.status(200).json({
            success:true,
            message:'Profile details updated successfully.',
            data:updatedUser
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while updating profile, please try again.'
        })
    }
}

//get user's all details
exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
        const id = req.user.id;

        //validation and get details
        const userDetails = await User.findById(id).populate("additionalDetails");

        return res.status(200).json({
            userDetails:userDetails,
            success:true,
            message:'All user details fetched successfully.'
        })
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while deleting Account, please try again.'
        })
    }
}

//update profile pic
exports.updateProfilePicture = async (req, res) => {
    try {
        const profilePicture = req.files.profilePicture
        const userId = req.user.id

        const image = await uploadImageToCloudinary(
                                                    profilePicture,
                                                    process.env.FOLDER_NAME,
                                                    1000,
                                                    1000
                                                )

        const updatedPicture = await User.findByIdAndUpdate(
            userId,
            {image:image?.secure_url},
            {new:true}
        )

        res.send({
            data:updatedPicture,
            success:true,
            message:'Profile Pic updated.'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:`Couldn't update profile pic.`
        })
    }
}

//delete account
exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const id = req.user.id;

        //validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(404).json({
                success:true,
                message:'User not found.'
            })
        }

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //unenroll user from all courses
        for(const courseId of userDetails?.courses) {
            await Course.findByIdAndUpdate(
                courseId,
                {
                    $pull:{
                        studentsEnrolled: id
                    }
                },
                {new:true}
            )
        }

        //delete user
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:'User Account deleted successfully.'
        })

        //return response
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while deleting Account, please try again.'
        })
    }
}

//enrolled courses
exports.getEnrolledCourses = async (req, res) => {

    try {
        const userId = req.user.id;

        const userDetails = await User.findOne({_id: userId})
                                        .populate({
                                            path:'courses',
                                            populate:{
                                                path:'courseContent'
                                            }
                                        })

        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find user with id: ${userDetails}`
            })
        }

        return res.status(200).json({
            success:true,
            data:userDetails.courses
        })

    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong while getting all enrolled courses.',
            error:err.message
        })
    }
}


//instructorDashbooard
exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({instructor:req.user.id})

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            //create a new object with the additional fields
            const courseDataWithStats = {
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats
        })

        return res.status(200).json({
            success:true,
            courses:courseData
        })
        
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success:false,
            message:'Internal server error.'
        })
    }
}