const ContactForm = require('../models/ContactForm');

exports.submitContactForm = async (req, res) => {
    try {
        const {firstName, lastName, email, message} = req.body;

        if(!firstName || !email || !message) {
            return res.status(400).json({
                success:false,
                message:'Please enter all required fields.'
            })
        }

        const contactFormdetails = await ContactForm.create(
            {
                firstName:firstName, 
                lastName:lastName, 
                email:email, 
                message:message
            }
        )

        return res.status(200).json({
            contactFormdetails,
            success:true,
            message:'Contact Us form submitted successfully.'
        })


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Contact form could not be submitted, please try again.'
        })
    }
}