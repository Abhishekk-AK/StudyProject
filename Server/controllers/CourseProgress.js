const SubSection = require('../models/Subsection')
const CourseProgress = require('../models/CourseProgress')
const User = require('../models/User')

exports.updateCourseProgress = async (req, res) => {
    const {courseId, subSectionId} = req.body
    const userId = req.user.id

    try {
       const subSection = await SubSection.findById(subSectionId)

       if(!subSection) {
        return res.status(404).json({
            error:'Invalid SubSection'
        })
       }

       //check for old entry
       let courseProgress = await CourseProgress.findOne({
                                                    courseID:courseId,
                                                    userId:userId
                                                })

        if(!courseProgress) {
            return res.status(404).json({
                success:false,
                message:'Course progress does not exist.'
            })
        } else {
            //check for re-completing video
            if(courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    error:'Video/subsection already completed'
                })
            }

            //push into completed video
            courseProgress.completedVideos.push(subSectionId)
        }
        await courseProgress.save()

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error:'Internal server error.'
        })
    }
}