import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

const ChipInput = (
    {label, name, placeholder, getValues, setValue, register, errors}
) => {

    const {course, editCourse} = useSelector((state) => state.course)
    const [chips, setChips] = useState([])

    useEffect(() => {
        if(editCourse) {
            setChips(course?.tag)
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
        setValue(name, chips)
    },[chips])

    //function to handle user input when chips are added
    const handleKeyDown = (event) => {
        if(event.key === "Enter" || event.key === ",") {
            event.preventDefault()

            const chipValue = event.target.value.trim()

            if(chipValue && !chips.includes(chipValue)) {
                const newChips = [...chips, chipValue]
                setChips(newChips)
                event.target.value = ""
            }
        }
    }

    //function to handle deletion of a chip
    const handleDeleteChip = (chipIndex) => {
        //filter the chips array to remove the chip with the given array
        const newChips = chips.filter((_, index) => index !== chipIndex)
        setChips(newChips)
    }

  return (
    <div> 
      <label htmlFor={name}>
        {label}<sup>*</sup>
      </label>
      <div>
        {
            chips.map((chip, index) => (
                <div
                    key={index}
                    className="w-full"
                >
                    {chip}
                    <button
                        type="button"
                        onClick={() => handleDeleteChip(index)}
                        className="ml-2 focus:outline-none"
                    >
                        <MdClose className="text-sm"/>
                    </button>
                </div>
            ))
        }
        <input
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className="w-full"
        />
      </div>
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

export default ChipInput