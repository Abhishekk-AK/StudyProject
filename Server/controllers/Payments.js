const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollEmail} = require('../mail/templates/courseEnrollEmail');
const { mongo, default: mongoose } = require('mongoose');


//capture the payment and initiate Razorpay order
exports.capturePayment = async (req, res) => {
    try {
        //get courseId and userId
        const userId = req.user.id;
        const {course_id} = req.body;

        //valid courseId
        if(!course_id) {
            return res.json({
                success:false,
                message:'Please provide valid course ID.'
            })
        }
        
        //valid courseDetail
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course) {
                return res.json({
                    success:false,
                    message:'Course not found.'
                })
            }

            //user already paid for this course
            const uid = new mongoose.Types.ObjectId(userId);

            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success:false,
                    message:'Student is already enrolled.'
                })
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success:true,
                message:err.message
            })
        }


        //order create
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId: course_id,
                userId
            }
        }

        //function call
        try {
            //initiate payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log('paymentResponse:', paymentResponse);

            //return response
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            })

        } catch (err) {
            console.log(err);
            return res.json({
                success:false,
                message:'Could not create order, please try again.'
            })
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Could not initiate payment, please try again.'
        })
    }
}


//verify signature of razorpay and server
exports.verifySignature = async (req, res) => {
    const webhookSecret = "728732436";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest) {
        console.log('Payment is authorized.')

        //Action -->> provide course access to user
        //getting courseId, userId from razorpay backend to our server
        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try {
            //find course and update enrolled student
            const encrolledCourse = await Course.findOneAndUpdate(
                                                {_id: courseId},
                                                {$push:{studentsEnrolled: userId}},
                                                {new:true}
                                            )
                        
            if(!encrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:'Course not found.'
                })
            }
            console.log(encrolledCourse);

            //find user and update course enrolled
            const encrolledStudent = await User.findOneAndUpdate(
                                                {_id:userId},
                                                {$push:{courses:courseId}},
                                                {new:true}
                                            )
            console.log(encrolledStudent);

            //send confirmation mail
            const emailResponse = await mailSender(
                                        encrolledStudent.email,
                                        "Congratulation for course enrollment.",
                                        "Congratulation, you are onborded to new course.",
                                    )
            console.log(emailResponse);

            return res.status(200).json({
                success:true,
                message:'Signature verified and Course access granted.'
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }

    } else {
        return res.status(400).json({
            success:false,
            message:'Invalid request, signature do not match.'
        })
    }
}