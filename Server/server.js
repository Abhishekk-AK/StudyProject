const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const {cloudinaryConnect} = require('./config/cloudinary');
const database = require('./config/database');
const razorpay = require('./config/razorpay')

const userRoutes = require('./routes/User');
const categoryRoutes = require('./routes/Category');
const paymentRoutes = require('./routes/Payment');
const profileRoutes = require('./routes/Profile');

//create express app
const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:'http://localhost:5173',
        credentials:true
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp'
    })
)

//databse
database.connect();
//cloudinary
cloudinaryConnect();

//routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/payment', paymentRoutes);

//default route
app.get('/', (req, res) => {
    return res.json({
        success:true,
        message:'Your server is up and running.'
    })
})

//server activate
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})