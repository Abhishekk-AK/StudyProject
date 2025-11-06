import RenderSteps from "./RenderSteps"

const AddCourse = () => {
  return (
    <>
      <div>
        <div>
            <h2>
                Add Course
            </h2>
            <div>
                <RenderSteps/>
            </div>
        </div>

        <div>
            <p>
                ⚡Course Upload Guidelines
            </p>
            <ul>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>ake Announcements to notify any important</li>
                <li>otes to all enrolled students at once.</li>
            </ul>
        </div>
      </div>
    </>
  )
}

export default AddCourse