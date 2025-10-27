const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req, res) => {
    try {
        //data fetch
        const {sectionName, courseId} = req.body;

        //data validation
        if(!sectionName || courseId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required.'
            })
        }

        //create section
        const newSection = await Section.create({sectionName});

        //update course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {
                                                        $push:{
                                                            courseContent: newSection._id
                                                        }
                                                    },
                                                    {new:true}
                                                )
                                                .populate("Section")

        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully.',
            updatedCourseDetails
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while creating section, please try again'
        })
    }
}


exports.updateSection = async (req, res) => {
    try {
        //data fetch
        const {sectionName, sectionId} = req.body;

        //data validation
        if(!sectionName || sectionId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required.'
            })
        }

        //update data
        const section = await Section.findByIdAndUpdate(
                                                        sectionId,
                                                        {sectionName},
                                                        {new:true}
                                                    )
                                                    
        return res.status(200).json({
            success:true,
            message:'Section updated successfully.'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while updating section, please try again'
        })        
    }
}


exports.deleteSection = async (req, res) => {
    try {
        //get ID
        const {sectionId} = req.params;

        //delete section
        await Section.findByIdAndDelete(sectionId);

        //return response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully.'
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong while deleting object, please try again.'
        })
    }
}