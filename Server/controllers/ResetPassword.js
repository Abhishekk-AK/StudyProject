const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        
        const {email} = req.body;

        //check user for this email, email validation
        const user = await User.findOne({email:email});
        if(!user) {
            return res.json({
                success:true,
                message:'Your email is not registered with us.'
            })
        }

        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time in DB
        const updatedDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpires: new Date(Date.now() + 5*60*1000)
                                            },
                                            {new:true}
                                        )

        //create url-> frontend url link
        const url = `http://localhost:5173/update-password/${token}`;
        
        //send mail containing the url
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`)
        
        //return response
        return res.json({
            success:true,
            message:'Password reset email sent successfully, please reset password.'
        })
       

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset password email.'
        })
    }
}


//resetPassword
exports.resetPassword = async (req, res) => {
    try {
        //fetch the data
        const {password, confirmPassword, token} = req.body;

        //data validation
        if(password !== confirmPassword) {
            return res.json({
                success:false,
                message:'Passwords do not match, enter same paswword in both fields.'
            })
        }

        //get userDetails form DB using token
        const userDetails = await User.findOne({token:token});
        
        //if no entry(token not found in DB) - invalid token or token expire
        if(!userDetails) {
            return res.json({
                success:false,
                message:'Invalid token.'
            })
        }

        //token time check
        if(userDetails.resetPasswordExpires < Date.now() ) {
            return res.json({
                success:false,
                message:'Token expired, please regenerate token.'
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update password in DB
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )

        //return response
        return res.status(200).json({
            success:true,
            message:'Password reset successfully.'
        })

    } catch (err) {
        console.log(err);
        return res.json({
            success:false,
            message:'Something went wrong while resetting password, please retry.'
        })
    }
}