const express = require('express');
const router = express.Router();

const { submitContactForm } = require('../controllers/ContactForm');


router.post('/submit-contact-form', submitContactForm);

module.exports= router;