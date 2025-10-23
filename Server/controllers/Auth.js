const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//send OTP
exports.sentOTP = async (req, res) => {
    
    try {
        const {email} = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({email});

        //if user exist, reurn response
        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:'User already registered.'
            })
        }


        //generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log('OTP generated.', otp);

        //check for unique OTP
        const result = await OTP.findOne({ otp:otp });

        //compare from DB
        while(result) {
            otp = otpGenerator(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })

            result = await OTP.findOne( {otp:otp} );
        }

        const otpPayload = {email, otp};

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log('OTP generated:', otp);

        //return OTP response
        res.status(200).json({
            success:true,
            message:'OTP sent successfully.',
            otp
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Error in OTP sending.'
        })
    }
}


//sign up
exports.signup = async (req, res) => {
    try {
        //data fetch
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || otp) {
            return res.status(403).json({
                success:false,
                message:'All fields are required.'
            })
        }

        //match both password
        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:'Password and confirm paswsword does not match.'
            })
        }

        //check user already exist
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:'User is already registered.'
            })
        }

        //find most recent OTP
        const recentOTP = (await OTP.find({email})).sort({createdAt: -1}).limit(1);
        console.log(recentOTP);

        //validate OTP
        if(recentOTP.length === 0) {
            //OTP not found
            return res.status(400).json({
                success:false,
                message:'OTP not found.'
            })

        } else if (otp !== recentOTP.otp) {
            //invalid OTP
            return res.status(400).json({
                success:false,
                message:'Invalid OTP'
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in DB

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            constactNumber:null
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails,
            image:`https://dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return response
        return res.status(200).json({
            success:true,
            message:'User is registered successfully.',
            user
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:`User can't be registered. Please try again.`
        })
    }
}


//login
exports.login = async (req,res) => {
    try {
        //get data
        const {email, password} = req.body;

        //validate data
        if(!email || !password) {
            return res.status(403).json({
                success:false,
                message:'All fields are required.'
            })
        }

        //check registered user
        const user = User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered, please sign up first.'
            })
        }

        //generate jwt token, after password matching
        if(await bcrypt.compare(password, user.password)) {
            
            const jwtPayload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
                expiresIn:'2h'
            })

            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expiresIn: new Date(Date.now() + 2*24*60*60*1000),
                httpOnly:true
            }

            res.cookie('token', token, options)
            .status(200).json({
                user,
                token,
                success:true,
                message:'User logged in successfully.'
            })

        } else {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect.'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Error in login, please try again.'
        })
    }
}


