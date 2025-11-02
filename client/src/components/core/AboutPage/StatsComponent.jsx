const Stats = [
  {count: '5K', label: 'Active Students'},
  {count: '10+', label: 'Mentors'},
  {count: '200+', label: 'Courses'},
  {count: '50+', label: 'Awards'}  
]

const StatsComponent = () => {
  return (
    <section>
      <div className="flex gap-x-5">
        {
          Stats.map((stat, index) => {
            return (
              <div key={index}>
                <h2>
                  {stat.count}
                </h2>
                <h3>
                  {stat.label}
                </h3>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default StatsComponent