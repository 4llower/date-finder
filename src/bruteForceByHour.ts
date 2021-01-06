import moment from 'moment'
import _ from 'lodash'

export const bruteForceByHour = ({ start, end, minTime, scheduler }: InputData) => {
  const hoursSummary = moment(end).diff(moment(start), 'hours')
  const scanLine = new Array(hoursSummary).fill(0)

  scheduler.forEach(({ s, e }) => {
    const startHour = Math.max(0, moment(s).diff(moment(start), 'hours'))
    scanLine[startHour]++
    const endHour = Math.min(hoursSummary - 1, moment(e).diff(moment(start), 'hours'))
    scanLine[endHour]--
  })

  const result: { s: string; e: string }[] = []
  let sum = 0
  let currentRange = 0

  for (let hour = 0; hour < hoursSummary; ++hour) {
    sum += scanLine[hour]

    if (sum === 0) currentRange++
    if (sum > 0 && currentRange > 0) {
      const startAvailable = moment(start)
        .add(hour - currentRange, 'hours')
        .format('YYYY-MM-DD HH:mm:ss')

      const endAvailable = moment(start).add(hour, 'hours').format('YYYY-MM-DD HH:mm:ss')

      result.push({
        s: startAvailable,
        e: endAvailable,
      })

      currentRange = 0
    }
  }

  if (currentRange > 1) {
    result.push({
      s: moment(start)
        .add(hoursSummary - currentRange, 'hours')
        .format('YYYY-MM-DD HH:mm:ss'),
      e: moment(start)
        .add(hoursSummary - 1, 'hours')
        .format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  return _.uniq(result.sort())
}

export const getAnswerForTest = (
  availableRanges: { s: string; e: string }[],
  { start, end, minTime }: InputData,
): string[] => {
  const daysSummary = moment(end).startOf('days').diff(moment(start).startOf('days'), 'days') + 1
  const result: string[] = []

  for (let day = 0; day < daysSummary; ++day) {
    let taken = false
    availableRanges.forEach(({ s, e }) => {
      if (taken) return
      const dayStart = moment(s).startOf('days').diff(moment(start).startOf('days'), 'days')
      const dayEnd = moment(e).startOf('days').diff(moment(start).startOf('days'), 'days')
      if (dayStart < day && day < dayEnd) {
        result.push(moment(start).add(day, 'days').format('YYYY-MM-DD'))
        taken = true
        return
      }
    })
    if (!taken) {
      const scanLine = new Array(24).fill(0)
      const currentDate = moment(start).add(day, 'days').startOf('day')
      let available = false
      availableRanges.forEach(({ s, e }) => {
        const dayStart = moment(s).startOf('days').diff(moment(start).startOf('days'), 'days')
        const dayEnd = moment(e).startOf('days').diff(moment(start).startOf('days'), 'days')
        if (dayStart === day || dayEnd === day) {
          const newStart = moment.max([moment(s), moment(currentDate)])
          const newEnd = moment.min([moment(e), moment(currentDate).add(23, 'hours')])
          available = true
          scanLine[newStart.hours()]++
          if (newEnd.hours() < 23) scanLine[newEnd.hours()]--
        }
      })

      if (available) {
        let sum = 0
        let range = 0
        let startHour = 0
        let endHour = 24
        if (day === 0) {
          startHour = moment(start).hours()
        }
        if (day === daysSummary - 1) {
          endHour = moment(end).hours()
        }
        for (let hour = 0; hour < 24; ++hour) {
          sum += scanLine[hour]
          if (sum && hour >= startHour && hour <= endHour) range++
          if (sum === 0 && range > 0) {
            if (range >= minTime) {
              result.push(currentDate.format('YYYY-MM-DD'))
              break
            }
            range = 0
          }
        }

        if (range) {
          if (range >= minTime) {
            result.push(currentDate.format('YYYY-MM-DD'))
          }
        }
      }
    }
  }

  return _.uniq(result.sort())
}
