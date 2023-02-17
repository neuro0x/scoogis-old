import { FC, useEffect, useState } from 'react'

export const Countdown: FC = () => {
  const [isOver, setIsOver] = useState(false)

  useEffect(() => {
    let countDownDate = new Date('Oct 31, 2021 18:59:00 GMT+2').getTime()
    const interval = setInterval(() => {
      let now = new Date().getTime()

      // Find the distance between now and the count down date
      let distance = countDownDate - now

      if (distance < 0) {
        setIsOver(true)
      }

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24))
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((distance % (1000 * 60)) / 1000)
      const daysEl = document.getElementById('days')
      const hoursEl = document.getElementById('hours')
      const minsEl = document.getElementById('mins')
      const secsEl = document.getElementById('secs')
      if (daysEl && hoursEl && minsEl && secsEl) {
        daysEl.innerHTML = ('0' + days).slice(-2) + ''
        hoursEl.innerHTML = ('0' + hours).slice(-2) + ''
        minsEl.innerHTML = ('0' + minutes).slice(-2) + ''
        secsEl.innerHTML = ('0' + seconds).slice(-2) + ''
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return !isOver ? (
    <div className="w-full pb-16 flex flex-col justify-center items-center">
      <span className="text-3xl font-bold tracking-tight sm:text-4xl">
        Doogi Snapshot Countdown 🐸❤️🐶
      </span>

      <div className="grid grid-flow-col gap-3 text-center auto-cols-max pt-4 sm:gap-5">
        <div className="flex flex-col justify-between py-8 px-4 rounded-xl bg-green-600 shadow-lg">
          <span className="font-mono text-2xl countdown sm:text-5xl">
            <span id="days">0</span>
          </span>
          days
        </div>

        <div className="flex flex-col justify-between py-8 px-4 rounded-xl bg-green-600 shadow-lg">
          <span className="font-mono text-2xl countdown sm:text-5xl">
            <span id="hours">24</span>
          </span>
          hours
        </div>

        <div className="flex flex-col justify-between py-8 px-4 rounded-xl bg-green-600 shadow-lg">
          <span className="font-mono text-2xl countdown sm:text-5xl">
            <span id="mins">13</span>
          </span>
          min
        </div>

        <div className="flex flex-col justify-between py-8 px-4 rounded-xl bg-green-600 shadow-lg">
          <span className="font-mono text-2xl countdown sm:text-5xl">
            <span id="secs">11</span>
          </span>
          sec
        </div>
      </div>
    </div>
  ) : (
    <> </>
  )
}
