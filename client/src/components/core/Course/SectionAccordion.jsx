import { useEffect, useRef, useState } from "react"
import SubsectionAccordion from "./SubsectionAccordion"
import { AiOutlineDown } from "react-icons/ai"

const SectionAccordion = (
    {section, isActive, key, handleActive}
) => {
console.log('first')
    const contentE1 = useRef(null)
    const [active, setActive] = useState(false)
    const [sectionHeight, setSectionHeight] = useState(0)

    useEffect(()=> {
        setActive(isActive?.includes(section._id))
    },[isActive])

    useEffect(() => {
        setSectionHeight(active ? contentE1.current.scrollHeight : 0)
    },[active])

  return (
    <div key={key} className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0 ">
      <div>
        <div
            onClick={() => {handleActive(section._id)}}
            className="flex items-start justify-between cursor-pointer bg-opacity-20 px-7 py-6 transition-[0.3s]"
        >
            <div className="flex items-center gap-2">
                <i
                    className={isActive.includes(section._id) ? 'rotate-180' : 'rotate-0'}
                >
                    <AiOutlineDown/>
                </i>
                <p>
                    {section?.sectionName}
                </p>
            </div>
            <div className="space-x-4">
                <span className="text-yellow-25">
                    {`${section?.subSection.length || 0} lecture(s)`}
                </span>
            </div>
        </div>
      </div>

      <div
        ref={contentE1}
        style={{height: sectionHeight}}
        className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-350 ease-[ease]"
      >
        <div
           className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold" 
        >
            {
                section?.subSection?.map((subSection, index) => (
                    <SubsectionAccordion subSection={subSection} key={index} />
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default SectionAccordion