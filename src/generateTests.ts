import moment from 'moment'

export const generateTests = (numberTests: number): { data: InputData }[] => {
  const result = []
  for (let i = 0; i < numberTests; ++i) {
    const rand = getRandomInt(1, 365)

    const start = moment('2020-01-01').startOf('days')
    start.add(rand, 'days')
    start.add(getRandomInt(1, 23), 'hours')

    const end = moment('2020-01-01').startOf('days')
    end.add(getRandomInt(rand, 365), 'days')
    end.add(getRandomInt(1, 23), 'hours')

    const scheduler = []

    for (let j = 0; j < 10; ++j) {
      const newRand = getRandomInt(5, 365)
      const s = moment('2020-01-01').startOf('days')
      s.add(newRand, 'days')
      s.add(getRandomInt(1, 10), 'hours')

      const e = moment('2020-01-01').startOf('days')
      e.add(getRandomInt(newRand, 365), 'days')
      e.add(getRandomInt(1, 10), 'hours')
      scheduler.push({
        s: s.format('YYYY-MM-DD HH:mm:ss'),
        e: e.format('YYYY-MM-DD HH:mm:ss'),
      })
    }

    result.push({
      data: {
        start: start.format('YYYY-MM-DD HH:mm:ss'),
        end: end.format('YYYY-MM-DD HH:mm:ss'),
        minTime: getRandomInt(1, 24),
        scheduler,
      },
    })
  }

  return result
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}