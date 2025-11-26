import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseApi'
import { formatDate } from '../../../../services/formatDate'
import { COURSE_STATUS } from '../../../../utils/constants'
import { HiClock } from 'react-icons/hi'
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import ConfirmationModal from '../../../common/ConfirmationModal'

const InstCoursesTable = ({courses, setCourses}) => {

    const navigate = useNavigate()
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async (courseId) => {
        console.log('first')
        setLoading(true)
        console.log('first')
        await deleteCourse({courseId:courseId}, token)
        const result = await fetchInstructorCourses(token)
        if(result) {
            setCourses(result?.courses)
        }
        setConfirmationModal(null)
        setLoading(false)
    }
    console.log(courses)

  return (
    <>
      <Table>
        <Thead>
            <Tr>
                <Th>
                    Courses
                </Th>
                <Th>
                    Duration
                </Th>
                <Th>
                    Price
                </Th>
                <Th>
                    Actions
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                courses?.length === 0
                ? (
                    <Tr>
                        <Td>
                            No Courses Found
                        </Td>
                    </Tr>
                )
                : (
                    courses?.map((course) => (
                        <Tr
                            key={course?._id}
                            className='flex gap-x-10'
                        >
                            <Td 
                                onClick={() => navigate(`/courses/${course?._id}`)}
                                className='flex'
                            >
                                <img
                                    src={course?.thumbnail}
                                    alt={course?.courseName}
                                    onClick={() => navigate(`/courses/${course?._id}`)}
                                    className='h-[148px] w-[200px] object-cover rounded-sm'
                                />
                                <div>
                                    <p>
                                        {course?.courseName}
                                    </p>
                                    <p>
                                        {
                                            course?.courseDescription.split(' ').length > TRUNCATE_LENGTH
                                            ? course.courseDescription
                                                .split(' ')
                                                .splice(0, TRUNCATE_LENGTH)
                                                .join(' ') + '...'
                                            : course.courseDescription
                                        }
                                    </p>
                                    <p>
                                        Created At: {formatDate(course?.createdAt)}
                                    </p>
                                    {
                                        course?.status === COURSE_STATUS.DRAFT
                                        ? (
                                            <p>
                                                <HiClock size={14} />
                                                Drafted
                                            </p>
                                        )
                                        : (
                                            <p>
                                                <FaCheck size={8} />
                                                Published
                                            </p>
                                        )
                                    }
                                </div>
                            </Td>
                            <Td>
                                {course?.totalDuration}
                            </Td>
                            <Td>
                                Rs. {course?.price}
                            </Td>
                            <Td>
                                <button
                                    disabled={loading}
                                    onClick={
                                        () => navigate(`/dashboard/edit-course/${course?._id}`)
                                    }
                                    title='Edit'
                                    className='px-2 hover:text-caribbeangreen-300'
                                >
                                    <FiEdit2 size={20}/>
                                </button>
                                <button
                                    disabled={loading}
                                    onClick={
                                        () => {setConfirmationModal(
                                            {
                                                text1: 'Do you want to Delete this course?',
                                                text2: 'All the data related to this course will be deleted.',
                                                btn1Text: !loading ? 'Delete' : 'Loading...',
                                                btn2Text: 'Cancel',
                                                btn1Handler: !loading
                                                    ? () => handleCourseDelete(course?._id)
                                                    : {},
                                                btn2Handler: !loading
                                                    ? () => setConfirmationModal(null)
                                                    : {}
                                            }
                                        )}
                                    }
                                >
                                    <RiDeleteBin6Line size={20} />
                                </button>
                            </Td>
                        </Tr>
                    ))
                )
            }
        </Tbody>
      </Table>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </>
  )
}

export default InstCoursesTable