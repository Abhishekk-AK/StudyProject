const Section = require('../models/Section');
const Course = require('../models/Course');
const Subsection = require('../models/Subsection');

exports.createSection = async (req, res) => {
    try {
        //data fetch
        const {sectionName, courseId} = req.body;

        //data validation
        if(!sectionName || !courseId) {
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
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
                                                })

        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully.',
            newSection,
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
        const {sectionName, sectionId, courseId} = req.body;

        //data validation
        if(!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required.'
            })
        }

        if( !await Section.findById(sectionId) ) {
            return res.status(200).json({
                success:true,
                message:'Section not found.'
            })
        }
        //update section
        const updatedSection = await Section.findByIdAndUpdate(
                                                        sectionId,
                                                        {sectionName},
                                                        {new:true}
                                                    )
                                                    
        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: 'Error in updating section, please try again.'
            });
        }

        const updatedCourse = await Course.findById(courseId)
                                                    .populate({
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection"
                                                        }
                                                    })      

        return res.status(200).json({
            success:true,
            message:'Section updated successfully.',
            updatedSection,
            updatedCourse
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
        const {sectionId, courseId} = req.body;

        if(!sectionId) {
            return res.status(400).json({
                success:false,
                message:'Section id required.'
            })
        }

        //find section
        const foundSection = await Section.findById(sectionId);

        if(!foundSection) {
            return res.status(200).json({
                success:true,
                hasData:false,
                message:'Section not found.'
            })
        }

        //delete it's subsections
        await Subsection.deleteMany({ _id: {$in: foundSection.subSection } })

        //update course
        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull:{
                    courseContent:sectionId
                }
            },
            {new:true}
        )

        //finally delete section
        await Section.findByIdAndDelete(sectionId);

        const updatedCourse = await Course.findById(courseId)
                                                    .populate({
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection"
                                                        }
                                                    })

        //return response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully.',
            course:updatedCourse
        })

    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong while deleting section, please try again.'
        })
    }
}