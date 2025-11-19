import { useState } from "react"
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables)

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState('Students')

    const getRandomColors = (noOfColors) => {
        const colors = []
        for(let i=0; i<noOfColors; i++) {
            const color = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
            colors.push(color)
        }
        return colors
    }

    //data for student chart
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    //data for income info chart
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    //options
    const options = {

    }

  return (
    <>
      <p>
        Visualise
      </p>
      <div>
        <button
            onClick={() => setCurrChart('Students')}
        >
            Student
        </button>
        <button
            onClick={() => setCurrChart('Income')}
        >
            Income
        </button>
      </div>
      <div>
        <Pie
            data = {currChart === 'Students' ? chartDataForStudents : chartDataForIncome}
        />
      </div>
    </>
  )
}

export default InstructorChart