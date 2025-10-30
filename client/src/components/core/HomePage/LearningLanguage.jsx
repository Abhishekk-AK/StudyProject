import HighlightText from "./HighlightText"
import Know_your_progress from '../../../assets/TimeLineLogo/Logo1.svg'
import Compare_with_others from '../../../assets/TimeLineLogo/Logo2.svg'
import Plan_your_lesson from '../../../assets/TimeLineLogo/Logo3.svg'
import CTAButton from "./Button"

const LearningLanguage = () => {
  return (
    <div className="mt-[130px] mb-32">
      <div className="flex flex-col gap-5 items-center ">

        <div className="text-4xl font-semibold text-center">
          Your Swiss Knife for
          <HighlightText text={'Learning any language'} />
        </div>
        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%] ">
          Using spin making learning multiple languages easy. With 20+ languages, realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex items-center justify-center mt-5">
          <img 
            src={Know_your_progress} 
            alt="KnowYourProgressImage"
            className="object-contain w-[250px]"
          />
          <img 
            src={Compare_with_others} 
            alt="CompareWithOthersImage"
            className="object-contain w-[250px]"
          />
          <img 
            src={Plan_your_lesson} 
            alt="PlanYourLessonImage"
            className="object-contain w-[250px]"
          />
        </div>

        <div className="w-fit">
          <CTAButton active={true} linkto={'/signup'}>
            Learn more
          </CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguage