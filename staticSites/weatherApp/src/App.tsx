import { useEffect } from 'react'
import List from './components/List'
import { data } from './data'
import './style/global.css'

function App() {
  const weatherData = data.list
  const currentWeather = data.list[0]
  const daysWeather = data.list
    .slice(1)
    .filter((day) => day.dt_txt.endsWith('12:00:00'))
  console.log(currentWeather?.dt_txt)
  console.log(currentWeather?.main.feels_like)

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch(
  //       'http://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&appid=&units=metric'
  //     )

  //     const data = await res.json()
  //     console.log(data)
  //   }

  //   getData()
  // }, [])

  return (
    <main className="w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900">
      <div className="row-start-1 mx-auto grid min-h-screen max-w-2xl grid-rows-[auto_minmax(300px,_max-content)_auto_auto_1fr] py-8 px-4">
        <div className="row-start-1 flex items-end justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl uppercase text-white sm:text-3xl">
              {data.city.name}
            </h1>
            <p className="font-light text-white opacity-80 sm:text-lg">
              {new Date().toLocaleDateString('sr-Latn', {
                month: 'long',
                year: 'numeric',
                weekday: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <span className="row-start-1 text-5xl font-light text-white sm:text-8xl">
            {Math.round(currentWeather.main.feels_like)} °C
          </span>
        </div>

        <img
          src="assets/sun.png"
          alt="sunčano"
          className="col-start-1 col-end-2 row-start-2 h-full place-self-center object-contain"
        />

        <div className="row-start-3 flex flex-row justify-between self-start pb-4 pt-1 text-sm font-extralight text-white opacity-80 sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:flex-col sm:items-end sm:py-8 sm:text-lg">
          <div className="text-md flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
              />
              <path
                fillRule="evenodd"
                d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"
              />
            </svg>
            50%
          </div>

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
            </svg>
            Ist. 20 km/h
          </div>

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z" />
              <path
                fillRule="evenodd"
                d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"
              />
            </svg>
            1010 hPa
          </div>
        </div>

        <div className="row-start-4">
          <List />
        </div>

        <footer className="row-start-5 mt-4 self-end text-center text-xs font-light text-white opacity-20">
          <p>Programirao: Edis Selimović</p>
        </footer>
      </div>
    </main>
  )
}

export default App
