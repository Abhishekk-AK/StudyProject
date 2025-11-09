import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { useState } from 'react'
import { MdAddCircleOutline, MdUpdate } from 'react-icons/md'
import { BiRightArrow } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import NestedView from './NestedView'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/CourseSlice'
import { createSection, updateSection } from '../../../../../services/operations/courseApi'
import toast from 'react-hot-toast'


const CourseBuilderForm = () => {

    const dispatch = useDispatch();

    const {register, handleSubmit, setValue, formState:{errors}} = useForm()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    const [editSectionName, setEditSectionName] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        let result;

        //editing the section
        if(editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id
                },
                token
            )
        }
        //creating a new section
        else {
            result = await createSection(
                {
                    sectionName: data.sectionName,
                    courseId: course._id
                },
                token
            )
        }

        //update values
        if(result) {
            dispatch(setCourse(result))
            setEditSectionName(null)
            setValue('sectionName', '')
        }

        setLoading(false)
    }

    const cancelEdit = () => {
        setEditSectionName(null)
        setValue('sectionName', '')
    }

    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }

    const goToNext = () => {
        if(course.courseContent.length === 0) {
            toast.error('Please add atleast one section')
            return
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error('Please add atleast one section in each section')
            return
        }
        dispatch(setStep(3))
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId) {
            cancelEdit()
            return
        }

        setEditSectionName(sectionId)
        setValue('sectionName', sectionName)
    }
    

  return (
    <div className='text-richblack-5'>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="sectionName">
                Section Name <sup>*</sup>
            </label>
            <input
                id='sectionName'
                placeholder='Add new section'
                {...register('sectionName', {required:true})}
                className='w-full'
            />
            {
                errors.sectionName && (
                    <span>Section Name is required</span>
                )
            }
        </div>

        <div className='flex'>
            <IconBtn
                type='Submit'
                text={
                    editSectionName ? 'Edit Section Name' : 'Create section'
                }
                outline={true}
                className='text-yellow-50'
            >
                <MdAddCircleOutline className='text-yellow-50'/>
            </IconBtn>
            {
                editSectionName && (
                    <button
                        type='button'
                        onClick={cancelEdit}
                        className='text-sm text-richblack-300 underline'
                    >
                        Cancel Edit
                    </button>
                )
            }
        </div>
      </form>
        
      {
        course?.courseContent?.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )
      }
      <div className='flex justify-end gap-x-3'>
        <button
            onClick={goBack}
            className='rounded-md cursor-pointer flex items-center'
        >            
            Back
        </button>
        <IconBtn
            text={'Next'}
            onclick={goToNext}
        >
            <BiRightArrow/>
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm