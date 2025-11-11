const Section = require('../models/Section');
const SubSection = require('../models/Subsection');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

exports.createSubSection = async (req, res) => {
    try {
        //fetch data
        const {sectionId, title, description} = req.body;

        //extract file/video from cloudinary
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !description || !video) {
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
                                                        timeDuration: `${uploadDetails.duration}`,
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
        const {sectionId, subSectionId, title, description} = req.body;

        if(!subSectionId || !sectionId) {
            return res.status(400).json({
                success:false,
                message:'Section and subsection id required.'
            })
        }

        const subSection = await SubSection.findById(subSectionId)
        if(!subSection) {
            return res.status(404).json({
                success:false,
                message:"Subsection not found."
            })
        }

        //check for undefined values
        if(title !== undefined) {
            subSection.title = title
        }

        if(description !== undefined) {
            subSection.description = description
        }

        if(req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile
            const updatedVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

            subSection.videoUrl = updatedVideo.secure_url
            subSection.timeDuration = `${updatedVideo.duration}`
        }

        await subSection.save()

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            updatedSubsection:subSection,
            updatedSection:updatedSection,
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
            return res.status(400).json({
                success:false,
                hasData:false,
                message:'Subsection not found.'
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull:{
                    subSection:subSectionId
                }
            },
            {new:true}
        ).populate("subSection")

        return res.status(200).json({
            success:true,
            message:'SubSection deleted successfully.',
            updatedSection
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