const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollEmail} = require('../mail/templates/courseEnrollEmail');
const { mongo, default: mongoose } = require('mongoose');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');


//capture the payment and initiate Razorpay order
exports.capturePayment = async (req, res) => {
    try {
        //get courseId and userId
        const userId = req.user.id;
        const {courses} = req.body;

        //valid course
        if(!courses.length) {
            return res.json({
                success:false,
                message:'Please provide valid course ID.'
            })
        }

        let total_amount = 0

        for( const course_id of courses) {
            let course;

            try {
                //valid courseDetail
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

                //total amount
                total_amount += course.price

            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    success:true,
                    message:err.message
                })
            }
        }
        

        //order create
        const amount = total_amount;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
        }

        //function call
        try {
            //initiate payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log('paymentResponse:', paymentResponse);

            //return response
            return res.status(200).json({
                success: true,
                data: paymentResponse
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


//verify payment
exports.verifyPayment = async (req, res) => {
    
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if(!razorpay_order_id
        || !razorpay_payment_id
        || !razorpay_signature
        || !courses
        || !userId
    ) {
        return res.status(200).json({
            success:false,
            message:'Payment verification failed'
        })
    }

    let body = razorpay_order_id + '|' + razorpay_payment_id

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex")

    if(expectedSignature === razorpay_signature) {
        await enrollStudent(courses, userId, res)
        return res.status(200).json({
            success:true,
            message:'Payment Verified'
        })
    }

    return res.status(200).json({
        success:false,
        message:'Payment failed'
    })
}

//payment success email
exports.sendPaymentSuccessEmail = async (req, res) => {
    const {orderId, paymentId, amount} = req.body
    const userId = req.user.id

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success:false,
            message:'Please provide all details'
        })
    }

    try {
        const enrolledStudent = await User.findById(userId)

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )

    } catch (err) {
        console.log('Error in sending email:', err)
        return res.status(400).json({
            success:false,
            message:'Could not send email.'
        })
    }
}




// //verify signature of razorpay and server
// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "728732436";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log('Payment is authorized.')

//         //Action -->> provide course access to user
//         //getting courseId, userId from razorpay backend to our server
//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//             //find course and update enrolled student

//             //find user and update course enrolled

//             //send confirmation mail
//     } else {
//         })
//     }
// }