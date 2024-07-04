import '../styles/MainDashboard.css'; // Adjusted import path

function MainDashboard() {
  return (
    <section className='main-dashboard'>
      <div className='main-header' >
        <input type="text" placeholder="Search for a city" />
        <h2>Tucson, Arizona</h2>
      </div>
      <div className='main-body'>
        <div>
          <div>
            <p className='current-time'>12:00pm </p>
            <p className='current-date'>June 22nd, 2023</p>
            <p className='current-temperature'>32</p>
          </div>
          <div>
            <p className='current-weather'>Sunny</p>
            <p className='current-humidity'>Humidity</p>
            <p className='current-wind'>Wind</p>
            <p className='current-uv'>UV Index</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainDashboard
