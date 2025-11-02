import CTAButton from "../HomePage/Button";
import HighlightText from "../HomePage/HighlightText";

const LearningGridArray = [
  {
    order:-1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere.",
    description:
      "Studytonn partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/"
  },
  {
    order:1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Spend time on what matters! Our curriculum is designed to be easier to understand and aligned with industry demands, helping learners stay competitive.",
  },
  {
    order:2,
    heading: "Our Learning Methods",
    description:
      "We combine cutting-edge technology with interactive content to create a dynamic learning experience that keeps learners motivated and involved.",
  },
  {
    order:3,
    heading: "Certification",
    description:
      "Earn certificates from top institutions that validate your skills and boost your career prospects across industries and borders.",
  },
  {
    order: 4,
    heading: "Rating and Upgrading",
    description:
    "Studyproject partners with more than 275+ leading universities and companies to bring recognized credentials to learners worldwide.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
    "Studyproject partners with more than 275+ universities and companies to bring job-ready training that prepares for real-world challenges and career success.",
  },
];


const LearningGrid = () => {
  return (
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit">
      {
        LearningGridArray.map((card, index) => {
            return (
                <div
                    key={index}
                    className={`${index === 0 && 'lg:col-span-2 lg:h-[280px] p-5'}
                                ${
                                    card.order % 2 === 1 ? 'bg-richblack-700 lg:h-[280px] p-5' : 'bg-richblack-800 lg:h-[280px] p-5'
                                }
                                ${
                                    card.order === 3 && 'lg:col-start-2'
                                }
                                ${
                                    card.order < 0 && 'bg-transparent'
                                }
                            `}
                >
                {
                    card.order < 0
                    ? (
                        <div className="lg:w-[90%] flex flex-col pb-5 gap-3">
                            <div className="text-4xl font-semibold">
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className="font-medium">
                                {card.description}
                            </p>
                            <div className="w-fit">
                                <CTAButton linkto={card.BtnLink} active={true}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    )
                    : (
                        <div className="flex flex-col gap-8 p-7">
                            <h3 className="text-richblack-5 text-lg">
                                {card.heading}
                            </h3>
                            <p className="text-richblack-300 font-medium">
                                {card.description}
                            </p>
                        </div>
                    )
                }
                </div>
            )
        })
      }
    </div>
  )
}

export default LearningGrid