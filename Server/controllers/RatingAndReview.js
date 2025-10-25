const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

exports.createRatingAndReview = async (req, res) => {
    try {
        const {userId} = req.user.id;

        if(!userId) {
            return res.json({
                success:false,
                message:'User is not registered.'
            })
        }

        //fetch data 
        const {rating, review, courseId} = req.body;

        //check if user id enrolled or not
        const courseDetails = await Course.findOne(
                                {
                                    _id:courseId,
                                    studentsEnrolled: {$elemMatch: {$eq: userId}},
                                },
                            )
        
        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course.'
            })
        }

        //check if user already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({
                                                            user:userId,
                                                            course:courseId
                                                        })
                                            
        if(alreadyReviewed) {
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed bu user.'
            })
        }

        //create rating and review
        const ratingAndReview = await RatingAndReview.create({
                                                        user: userId,
                                                        course:courseId,
                                                        rating,
                                                        review
                                                    })
        
        //up course with this rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                {
                                    $push:{
                                        ratingAndReviews: ratingAndReview._id
                                    }
                                },
                                {new:true}
                            )
        console.log(updatedCourseDetails);

        return res.status(200).json({
            success:true,
            message:'Rating and review given by the user successfully.',
            ratingAndReview
        })     

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while creating rating and reviews.'
        })
    }
}


//get average rating
exports.averageRating = async (req, res) => {
    try {
        const {courseId} = req.body.co;

        // if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        //     return res.status(400).json({
        //         success: false, 
        //         message: "Invalid rating value." 
        //     });
        // }

        // const result = await RatingAndReview.aggregate([
        //     {
        //         $group:{
        //             _id:null,
        //             averageRating:{ $avg: "$rating"}
        //         }
        //     }
        // ])

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg: "rating"}
                }
            }
        ])


        const avgRating = result[0]?.averageRating || 0;

        return res.status(200).json({
            avgRating:avgRating,
            success:true,
            message:'Average rating calculated.'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while getting rating.'
        })
    }
}


//get all rating and review
exports.getALLRatingAndReview = async (req,res) => {
    try {
        
        const allRatingAndReview = await RatingAndReview.find()
                                        .sort({rating:'desc'})
                                        .populate("user", "firstName lastName image")
                                        .populate({
                                            path:"course",
                                            select:"courseName"
                                        })

        return res.status(200).json({
            allRatingAndReview:allRatingAndReview,
            success:true,
            message:'All rating and reviews fetched successfully.'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while getting all rating and reviews.'
        })
    }
}