import moment from 'moment'
import * as _ from 'lodash'

export const getFreeDays = ({ start, end, minTime, scheduler }: InputData) => {
  const daysSummary = moment(end).startOf('days').diff(moment(start).startOf('days'), 'days') + 1
  const scanLine = new Array(daysSummary + 1).fill(0)
  const supposedDays: number[] = []
  const newScheduler = [...scheduler]

  newScheduler.push({
    s: moment(start).startOf('days').format('YYYY-MM-DD HH:mm:ss'),
    e: start,
  })

  if (moment(end).hours() >= 1) {
    newScheduler.push({
      s: moment(end).subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
      e: moment(end).startOf('days').add(23, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    })
  } else {
    newScheduler.push({
      s: end,
      e: moment(end).startOf('days').add(23, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  newScheduler.forEach(({ s, e }) => {
    const startDay = moment(s).diff(moment(start).startOf('days'), 'days')
    scanLine[startDay]++
    const endDay = moment(e).diff(moment(start).startOf('days'), 'days')
    scanLine[endDay + 1]--
    supposedDays.push(startDay)
    supposedDays.push(endDay)
  })

  supposedDays.sort((a: number, b: number) => (a < b ? -1 : 1))

  const result: string[] = []
  let sum = 0

  for (let day = 0; day < daysSummary; ++day) {
    sum += scanLine[day]
    if (sum === 0) {
      result.push(moment(start).add(day, 'days').format('YYYY-MM-DD'))
    }
  }

  _.uniq(supposedDays).forEach((day, index) => {
    const supposedScanLine = new Array(24).fill(0)
    const currentDate = moment(start).add(day, 'days').startOf('day')
    let isSupposed = true
    newScheduler.forEach(({ s, e }) => {
      const daysStart = moment(s).startOf('days').diff(currentDate, 'days')
      const daysEnd = moment(e).startOf('days').diff(currentDate, 'days')

      if (daysStart > 0 || daysEnd < 0 || !isSupposed) {
        return
      }

      if (
        moment(s).startOf('days').diff(moment(start).startOf('days'), 'days') < day &&
        day < moment(e).startOf('days').diff(moment(start).startOf('days'), 'days')
      ) {
        isSupposed = false
        return
      }

      const newStart = moment.max([moment(s), moment(currentDate)])
      const newEnd = moment.min([moment(e), moment(currentDate).add(23, 'hours')])

      supposedScanLine[newStart.hours()]++
      if (newEnd.hours() < 23) supposedScanLine[newEnd.hours()]--
    })

    if (!isSupposed) return

    let supposedSum = 0
    let supposedRange = 0
    for (let hour = 0; hour < 24; ++hour) {
      supposedSum += supposedScanLine[hour]
      if (supposedSum === 0) supposedRange++
      if (supposedSum > 0 && supposedRange > 0) {
        if (supposedRange >= minTime) {
          result.push(currentDate.format('YYYY-MM-DD'))
          return
        }
        supposedRange = 0
      }
    }

    if (supposedRange) {
      if (supposedRange >= minTime) {
        result.push(currentDate.format('YYYY-MM-DD'))
        return
      }
    }
  })

  return _.uniq(result.sort())
}
