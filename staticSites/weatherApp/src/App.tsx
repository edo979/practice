import ErrorPage from './components/ErrorPage'
import List from './components/List'
import Loading from './components/Loading'
import { useWeatherData } from './hooks/useWeatherData'
import '../src/style/global.css'
import Modal from './components/Modal'
import { useState } from 'react'

function App() {
  const { data, isLoading, isError } = useWeatherData()
  const [isModalShow, setIsModalShow] = useState(false)

  let content

  if (isLoading) {
    content = <Loading />
  } else if (isError) {
    content = <ErrorPage />
  } else {
    content = (
      <main className="relative w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900">
        <div className="main-grid-container row-start-1 mx-auto grid max-w-2xl grid-rows-[auto_minmax(200px,_max-content)_auto_auto_1fr] py-8 px-4">
          <div className="row-start-1 flex items-end justify-between">
            <div className="flex flex-col">
              <div className="flex min-w-[180px] flex-row items-center justify-between gap-2">
                <h1 className="text-2xl uppercase text-white sm:text-3xl">
                  {data?.city.toLowerCase().replace('hrasno', 'sarajevo')}
                </h1>

                <button
                  className="z-10 cursor-pointer rounded-md border border-blue-50 border-opacity-30 bg-blue-50 bg-opacity-20 py-1.5 px-2 text-white hover:border-opacity-40 hover:bg-opacity-30"
                  onClick={(e) => setIsModalShow((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>

              <p className="font-light text-white opacity-80 sm:text-lg">
                {new Date()
                  .toLocaleDateString('sr-Latn', {
                    month: 'long',
                    year: 'numeric',
                    weekday: 'long',
                    day: 'numeric',
                  })
                  .toString()
                  .replace('sreda', 'srijeda')}
              </p>
            </div>

            <span className="row-start-1 text-5xl font-light text-white sm:text-8xl">
              {data?.currentTemp} °C
            </span>
          </div>

          <picture className="col-start-1 col-end-2 row-start-2 h-full place-self-center object-contain sm:-mt-24 sm:mb-12">
            <source
              srcSet={`assets/weatherIcon/hiRes/${data?.icon}.png`}
              media="(min-width: 600px)"
            />
            <img
              src={`assets/weatherIcon/lowRes/${data?.icon}.png`}
              alt={data?.icon}
            />
          </picture>

          <div className="row-start-3 flex flex-row justify-between self-start pb-6 pt-3 text-sm font-extralight text-white opacity-80 sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:flex-col sm:items-end sm:py-8 sm:text-lg">
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
              {data?.humidity}%
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
              {data?.windDir}. {data?.windSpeed} km/h
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
              {data?.pressure} hPa
            </div>
          </div>

          <div className="row-start-4">
            <List data={data?.daysWeather} />
          </div>

          <footer className="row-start-5 mt-4 self-end text-center text-xs font-light text-white opacity-20">
            <p>Programirao: Edis Selimović</p>
          </footer>
        </div>

        <Modal isShow={isModalShow} setIsShow={setIsModalShow} />
      </main>
    )
  }

  return content
}

export default App
