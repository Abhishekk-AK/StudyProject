const Section = require('../models/Section');
const SubSection = require('../models/Subsection');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

exports.createSubSection = async (req, res) => {
    try {
        //fetch data
        const {sectionId, title, timeDuration, description} = req.body;

        //extract file/video from cloudinary
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success:true,
                message:'All fields are required.'
            })
        }

        //upload on cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create on subsection
        const subsectionDetails = await SubSection.create({
                                                        title: title,
                                                        timeDuration: timeDuration,
                                                        description: description,
                                                        videoUrl: uploadDetails.secure_url
                                                    })

        //update section with subsection
        const updatedSection = await Section.findByIdAndUpdate(
                                                        {_id:sectionId},
                                                        {
                                                            $push:{
                                                                subSection: subsectionDetails._id
                                                            }
                                                        },
                                                        {new:true} 
                                                    )
                                                    .populate("subSection")

        //return response
        return res.status(200).json({
            success:true,
            message:'Subsection created successfully.',
            subsectionDetails,
            updatedSection
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong, please try again.',
            error:err.message
        })
    }
}


//update subsection
exports.updateSubsection = async (req, res) => {
    try {
        const {subSectionId, title, description, timeDuration, videoUrl} = req.body;

        if(!subSectionId || !title || !timeDuration || !description || !videoUrl) {
            return res.status(400).json({
                success:false,
                message:'All fields are required.'
            })
        }

        const updatedSubsection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title:title,
                description:description,
                timeDuration:timeDuration,
                videoUrl:videoUrl
            },
            {new:true}
        )

        return res.json({
            updatedSS:updatedSubsection,
            success:true,
            message:'Subsection updated successfully.'
        })
    } catch (err) {
        console.error(err);
        return res.status(200).json({
            success:false,
            message:'Subsection could not be updated, please try again.'
        })
    }
}

//delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        const {sectionId, subSectionId} = req.body;

        if(!subSectionId) {
            return res.status(400).json({
                success:false,
                message:'SubSection id is required.'
            })
        }

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        if(!deletedSubSection) {
            return res.status(200).json({
                success:true,
                hasData:false,
                message:'Subsection not found.'
            })
        }

        await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull:{
                    subSection:subSectionId
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:'SubSection deleted successfully.'
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Subsection could not be deleted, please try again.',
            error:err.message
        })
    }
}