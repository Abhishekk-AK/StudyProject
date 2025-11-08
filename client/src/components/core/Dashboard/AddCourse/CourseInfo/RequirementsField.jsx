import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const RequirementsField = (
  { name, label, register, setValue, errors }
) => {

  const { course, editCourse } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState('')
  const [requirementsList, setRequirementsList] = useState([])


  useEffect(() => {
    if(editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(
      name, 
      { 
        required:true, 
        validate: (value) => value.length > 0 
      }
    )
  },[])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList])



  const handleAddRequirement = () => {
    if(requirement) {
      setRequirementsList([...requirementsList, requirement])
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }



  return (
    <div>
      <label htmlFor={name}>
        {label}<sup>*</sup>
      </label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {
        requirementsList.length > 0 && (
          <ul>
            {
              requirementsList.map((requirement, index) => (
                <li key={index}>
                  <span>{requirement}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className="ml-2"
                  >
                    Clear
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }
      {
        errors[name] && (
          <span>
            {label} is required
          </span>
        )
      }
    </div>
  )
}

export default RequirementsField