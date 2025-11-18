const Profile = require('../models/Profile');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    try {
        //get data
        const {dateOfBirth='', about='', contactNumber, gender} = req.body;

        //get userId
        const id = req.user.id;

        //data validation
        if(!contactNumber || !gender || !id) {
            return res.status(400).json({
                success:false,
                message:'All fields are required.'
            })
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            message:'Profile details updated successfully.',
            profileDetails
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