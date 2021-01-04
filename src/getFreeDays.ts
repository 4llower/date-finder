import moment from 'moment'
import * as _ from 'lodash'

export const getFreeDays = ({ start, end, minTime, scheduler }: InputData) => {
  const daysSummary = moment(end).diff(moment(start), 'days')
  console.log(daysSummary)

  const scanLine = new Array(daysSummary).fill(0)

  scheduler.forEach(({ s, e }) => {
    const startDay = moment(s).diff(start, 'days')
    scanLine[startDay]++
    const endDay = moment(e).diff(start, 'days')
    scanLine[endDay]--
  })

  const result: string[] = []
  let sum = 0

  for (let day = 0; day < daysSummary; ++day) {
    sum += scanLine[day]
    if (scanLine[day] === 0 && sum === 0) {
      result.push(moment(start).add(day, 'days').format('YYYY-MM-DD'))
    }
  }

  const supposedDays: number[] = []

  scheduler.forEach(({ s, e }) => {
    supposedDays.push(moment(s).diff(start, 'days'))
    supposedDays.push(moment(e).diff(start, 'days'))
  })

  supposedDays.forEach((day, index) => {
    const supposedScanLine = new Array(24).fill(0)
    const currentDate = moment(start).add(day, 'days').startOf('day')

    let isSupposed = true

    scheduler.forEach(({ s, e }) => {
      if (
        moment(s).startOf('days').diff(currentDate, 'days') > 0 ||
        moment(e).startOf('days').diff(currentDate, 'days') < 0 ||
        !isSupposed
      ) {
        return
      }

      if (
        moment(s).startOf('days').diff(currentDate, 'days') < day &&
        day < moment(e).startOf('days').diff(currentDate, 'days')
      ) {
        isSupposed = false
        return
      }

      const newStart = moment.max([moment(s), moment(currentDate)])
      const newEnd = moment.min([moment(e), moment(currentDate).add(23, 'hours')])

      supposedScanLine[newStart.diff(currentDate, 'hours')]++
      supposedScanLine[newEnd.diff(currentDate, 'hours')]--
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
          break
        }
        supposedRange = 0
      }
    }
  })

  return _.uniq(result)
}
