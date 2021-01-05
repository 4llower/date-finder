import moment from 'moment'

export const bruteForceByHour = ({ start, end, minTime, scheduler }: InputData) => {
  const hoursSummary = moment(end).diff(moment(start), 'hours')
  const scanLine = new Array(hoursSummary).fill(0)

  scheduler.push({
    s: moment(start).startOf('days').format('YYYY-MM-DD HH:mm:ss'),
    e: start,
  })

  scheduler.push({
    s: end,
    e: moment(end).startOf('days').add(23, 'hours').format('YYYY-MM-DD HH:mm:ss'),
  })

  scheduler.forEach(({ s, e }) => {
    const startHour = moment.duration(moment(s).diff(moment(start))).asHours()
    scanLine[startHour]++
    const endHour = moment.duration(moment(e).diff(moment(start))).asHours()
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

      const endAvailable = moment(start)
        .add(hour - 1, 'hours')
        .format('YYYY-MM-DD HH:mm:ss')

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
        .add(hoursSummary - currentRange + 1, 'hours')
        .format('YYYY-MM-DD HH:mm:ss'),
      e: moment(start)
        .add(hoursSummary - 1, 'hours')
        .format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  return result
}

export const getAnswerForTest = (
  availableRanges: { s: string; e: string }[],
  { start, end, minTime }: InputData,
): string[] => {
  const daysSummary = moment(end).diff(moment(start), 'days')
  const result: string[] = []

  for (let i = 0; i < daysSummary; ++i) {
    let taken = false
    availableRanges.forEach(({ s, e }) => {
      if (taken) return
      if (
        moment(s).startOf('days').diff(start, 'days') < i &&
        i < moment(e).startOf('days').diff(start, 'days')
      ) {
        result.push(moment(start).add(i, 'days').format('YYYY-MM-DD'))
        taken = true
      }
    })
  }

  return result
}
