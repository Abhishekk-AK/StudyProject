import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'


const timeLine = [
    {
        Logo: Logo1,
        heading: 'Leadership',
        Description: 'Fully committed to your success.'
    },
    {
        Logo: Logo2,
        heading: 'Leadership',
        Description: 'Fully committed to your success.'
    },
    {
        Logo: Logo3,
        heading: 'Leadership',
        Description: 'Fully committed to your success.'
    },
    {
        Logo: Logo4,
        heading: 'Leadership',
        Description: 'Fully committed to your success.'
    }
]

const TimeLine = () => {

  return (
    <>
      <div className="flex flex-row gap-15 items-center">

        <div className="w-[45%] flex flex-col gap-5">
          {
            timeLine.map( (element, index) => {
              return (
                <div className='flex gap-6' key={index}>

                  <div className='w-[50px] h-[50px] bg-white flex items-center '>
                    <img src={element.Logo} />
                  </div>
                  <div>
                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                    <p className='text-base'>{element.Description}</p>
                  </div>

                </div>
              )
            })
          }
        </div>

        <div className='relative shadow-blue-200'>

          <img 
            src={Logo1}
            alt='timelineImage'
            className=' w-[300px] shadow-white object-cover h-fit'
          />
          
          <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-7 '>
            <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7 translate-x-[-50%] translate-y-[-50%]'>
              <p className='text-3xl font-bold '>10</p>
              <p className='text-caribbeangreen-300 text-sm '>Years of Experience</p>
            </div>
            <div className='flex gap-5 items-center px-7 '>
              <p className='text-3xl font-bold '>250</p>
              <p className='text-caribbeangreen-300 text-sm '>Types of courses</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default TimeLine