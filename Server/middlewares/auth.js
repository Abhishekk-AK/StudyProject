const jwt = require('jsonwebtoken');

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token =  req?.cookies?.token || req?.body?.token || req?.header("Authorization")?.replace("Bearer ", "");

        //if token missing then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token not found.'
            })
        }

        //verify token
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decodedPayload);
            req.user = decodedPayload;

        } catch (err) {
            //verification issue
            return res.status(401).json({
                success:false,
                message:'Invalid token.'
            })
        }
        next();

    } catch (err) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while token validation.'
        })
    }
}


//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is protected route for Students only.'
            })
        }

        next();

    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified.'
        })
    }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:'This is protected route for Instructors only.'
            })
        }

        next();
        
    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified.'
        })
    }
}


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'This is protected route for Admin only.'
            })
        }

        next();
        
    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified.'
        })
    }
}