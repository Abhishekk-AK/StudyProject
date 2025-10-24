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

//delete subsection