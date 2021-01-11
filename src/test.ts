import { bruteForceByHour, getAnswerForTest } from './bruteForceByHour'
import { getFreeDays } from './getFreeDays'
import _ from 'lodash'
// import { generateTests } from './generateTests'

const testCases: TestCase[] = [
  {
    data: {
      minTime: 4,
      start: '2021-01-11 14:08:20',
      end: '2021-11-11 11:54:00',
      scheduler: [
        {
          e: '2020-12-14 00:00:00',
          s: '2020-12-12 00:00:00',
        },
        {
          e: '2020-12-15 00:00:00',
          s: '2020-12-14 00:00:00',
        },
        {
          e: '2020-12-15 00:00:00',
          s: '2020-12-14 00:00:00',
        },
        {
          e: '2020-12-15 10:00:00',
          s: '2020-12-14 09:00:00',
        },
        {
          e: '2020-12-21 00:00:00',
          s: '2020-12-19 00:00:00',
        },
        {
          e: '2020-12-22 00:00:00',
          s: '2020-12-21 00:00:00',
        },
        {
          e: '2020-12-22 00:00:00',
          s: '2020-12-21 00:00:00',
        },
        {
          e: '2020-12-22 10:00:00',
          s: '2020-12-21 09:00:00',
        },
        {
          e: '2020-12-28 00:00:00',
          s: '2020-12-26 00:00:00',
        },
        {
          e: '2020-12-29 00:00:00',
          s: '2020-12-28 00:00:00',
        },
        {
          e: '2020-12-29 00:00:00',
          s: '2020-12-28 00:00:00',
        },
        {
          e: '2020-12-29 10:00:00',
          s: '2020-12-28 09:00:00',
        },
        {
          e: '2021-01-04 00:00:00',
          s: '2021-01-02 00:00:00',
        },
        {
          e: '2021-01-05 00:00:00',
          s: '2021-01-04 00:00:00',
        },
        {
          e: '2021-01-05 00:00:00',
          s: '2021-01-04 00:00:00',
        },
        {
          e: '2021-01-05 10:00:00',
          s: '2021-01-04 09:00:00',
        },
        {
          e: '2021-01-11 00:00:00',
          s: '2021-01-09 00:00:00',
        },
        {
          e: '2021-01-07 15:25:50',
          s: '2021-01-10 00:00:00',
        },
        {
          e: '2021-01-07 15:27:30',
          s: '2021-01-10 00:00:00',
        },
        {
          e: '2021-01-07 15:30:12',
          s: '2021-01-10 00:00:00',
        },
        {
          e: '2021-01-07 16:43:04',
          s: '2021-01-10 00:00:00',
        },
        {
          e: '2021-01-08 12:16:49',
          s: '2021-01-10 00:00:00',
        },
        {
          e: '2021-01-12 00:00:00',
          s: '2021-01-11 00:00:00',
        },
        {
          e: '2021-01-12 00:00:00',
          s: '2021-01-11 00:00:00',
        },
        {
          e: '2021-01-12 10:00:00',
          s: '2021-01-11 09:00:00',
        },
        {
          e: '2021-01-18 00:00:00',
          s: '2021-01-16 00:00:00',
        },
        {
          e: '2021-01-19 00:00:00',
          s: '2021-01-18 00:00:00',
        },
        {
          e: '2021-01-19 00:00:00',
          s: '2021-01-18 00:00:00',
        },
        {
          e: '2021-01-19 10:00:00',
          s: '2021-01-18 09:00:00',
        },
        {
          e: '2021-01-25 00:00:00',
          s: '2021-01-23 00:00:00',
        },
        {
          e: '2021-01-26 00:00:00',
          s: '2021-01-25 00:00:00',
        },
        {
          e: '2021-01-26 00:00:00',
          s: '2021-01-25 00:00:00',
        },
        {
          e: '2021-01-26 10:00:00',
          s: '2021-01-25 09:00:00',
        },
        {
          e: '2021-02-01 00:00:00',
          s: '2021-01-30 00:00:00',
        },
        {
          e: '2021-02-02 00:00:00',
          s: '2021-02-01 00:00:00',
        },
        {
          e: '2021-02-02 00:00:00',
          s: '2021-02-01 00:00:00',
        },
        {
          e: '2021-02-02 10:00:00',
          s: '2021-02-01 09:00:00',
        },
        {
          e: '2021-02-08 00:00:00',
          s: '2021-02-06 00:00:00',
        },
        {
          e: '2021-02-09 00:00:00',
          s: '2021-02-08 00:00:00',
        },
        {
          e: '2021-02-09 00:00:00',
          s: '2021-02-08 00:00:00',
        },
        {
          e: '2021-02-09 10:00:00',
          s: '2021-02-08 09:00:00',
        },
      ],
    },
  },
  {
    data: {
      start: '2020-12-05 00:00:00',
      end: '2020-12-10 00:00:00',
      minTime: 4,
      scheduler: [
        {
          s: '2020-12-05 00:00:00',
          e: '2020-12-07 00:00:00',
        },
        {
          s: '2020-12-07 10:00:00',
          e: '2020-12-08 09:00:00',
        },
        {
          s: '2020-12-08 12:00:00',
          e: '2020-12-09 10:00:00',
        },
        {
          s: '2020-12-09 19:00:00',
          e: '2020-12-10 00:00:00',
        },
      ],
    },
    expected: ['2020-12-07', '2020-12-09'],
  },
  {
    data: {
      start: '2020-12-02 00:00:00',
      end: '2020-12-10 00:00:00',
      minTime: 10,
      scheduler: [
        {
          s: '2020-12-05 00:00:00',
          e: '2020-12-07 00:00:00',
        },
        {
          s: '2020-12-02 10:00:00',
          e: '2020-12-10 09:00:00',
        },
        {
          s: '2020-12-08 12:00:00',
          e: '2020-12-09 10:00:00',
        },
        {
          s: '2020-12-09 19:00:00',
          e: '2020-12-10 00:00:00',
        },
      ],
    },
    expected: ['2020-12-02'],
  },
  {
    data: {
      start: '2020-12-02 00:00:00',
      end: '2020-12-10 00:00:00',
      minTime: 15,
      scheduler: [
        {
          s: '2020-12-05 00:00:00',
          e: '2020-12-07 00:00:00',
        },
        {
          s: '2020-12-02 10:00:00',
          e: '2020-12-10 09:00:00',
        },
        {
          s: '2020-12-08 12:00:00',
          e: '2020-12-09 10:00:00',
        },
        {
          s: '2020-12-09 19:00:00',
          e: '2020-12-10 00:00:00',
        },
      ],
    },
    expected: [],
  },
  {
    data: {
      start: '2020-12-02 00:00:00',
      end: '2020-12-10 00:00:00',
      minTime: 2,
      scheduler: [
        {
          s: '2020-12-02 00:00:00',
          e: '2020-12-02 08:00:00',
        },
        {
          s: '2020-12-02 10:00:00',
          e: '2020-12-10 09:00:00',
        },
        {
          s: '2020-12-08 12:00:00',
          e: '2020-12-09 10:00:00',
        },
        {
          s: '2020-12-09 19:00:00',
          e: '2020-12-10 00:00:00',
        },
      ],
    },
    expected: ['2020-12-02'],
  },
  {
    data: {
      start: '2020-12-02 00:00:00',
      end: '2020-12-10 00:00:00',
      minTime: 2,
      scheduler: [
        {
          s: '2020-12-02 00:00:00',
          e: '2020-12-02 10:00:00',
        },
        {
          s: '2020-12-02 10:00:00',
          e: '2020-12-10 09:00:00',
        },
        {
          s: '2020-12-08 12:00:00',
          e: '2020-12-09 10:00:00',
        },
        {
          s: '2020-12-09 19:00:00',
          e: '2020-12-10 00:00:00',
        },
      ],
    },
    expected: [],
  },
  {
    data: {
      start: '2020-01-03 11:00:00',
      end: '2020-01-21 02:00:00',
      minTime: 8,
      scheduler: [
        { s: '2020-01-13 01:00:00', e: '2020-01-14 13:00:00' },
        { s: '2020-01-09 10:00:00', e: '2020-01-10 12:00:00' },
        { s: '2020-01-15 19:00:00', e: '2020-01-19 15:00:00' },
        { s: '2020-01-15 06:00:00', e: '2020-01-19 18:00:00' },
        { s: '2020-01-13 08:00:00', e: '2020-01-16 15:00:00' },
      ],
    },
    expected: [
      '2020-01-03',
      '2020-01-04',
      '2020-01-05',
      '2020-01-06',
      '2020-01-07',
      '2020-01-08',
      '2020-01-09',
      '2020-01-10',
      '2020-01-11',
      '2020-01-12',
      '2020-01-20',
    ],
  },
  {
    data: {
      start: '2020-01-10 05:00:00',
      end: '2020-01-20 08:00:00',
      minTime: 12,
      scheduler: [
        { s: '2020-01-16 12:00:00', e: '2020-01-18 18:00:00' },
        { s: '2020-01-15 19:00:00', e: '2020-01-16 14:00:00' },
        { s: '2020-01-13 10:00:00', e: '2020-01-19 10:00:00' },
        { s: '2020-01-18 14:00:00', e: '2020-01-19 06:00:00' },
        { s: '2020-01-15 01:00:00', e: '2020-01-18 14:00:00' },
      ],
    },
    expected: ['2020-01-10', '2020-01-11', '2020-01-12', '2020-01-19'],
  },
  {
    data: {
      start: '2020-01-03 09:00:00',
      end: '2020-01-07 16:00:00',
      minTime: 12,
      scheduler: [
        { s: '2020-01-06 03:00:00', e: '2020-01-07 08:00:00' },
        { s: '2020-01-06 01:00:00', e: '2020-01-07 10:00:00' },
        { s: '2020-01-06 22:00:00', e: '2020-01-07 22:00:00' },
        { s: '2020-01-05 10:00:00', e: '2020-01-06 22:00:00' },
        { s: '2020-01-05 11:00:00', e: '2020-01-06 14:00:00' },
      ],
    },
    expected: ['2020-01-03', '2020-01-04'],
  },
  {
    data: {
      start: '2020-01-07 09:00:00',
      end: '2020-01-13 20:00:00',
      minTime: 15,
      scheduler: [
        { s: '2020-01-10 10:00:00', e: '2020-01-12 08:00:00' },
        { s: '2020-01-11 01:00:00', e: '2020-01-12 12:00:00' },
        { s: '2020-01-11 19:00:00', e: '2020-01-12 07:00:00' },
        { s: '2020-01-09 18:00:00', e: '2020-01-10 15:00:00' },
        { s: '2020-01-12 06:00:00', e: '2020-01-13 01:00:00' },
      ],
    },
    expected: ['2020-01-07', '2020-01-08', '2020-01-09', '2020-01-13'],
  },
  {
    data: {
      start: '2020-01-13 08:00:00',
      end: '2020-01-27 07:00:00',
      minTime: 11,
      scheduler: [
        { s: '2020-01-15 20:00:00', e: '2020-01-25 08:00:00' },
        { s: '2020-01-21 19:00:00', e: '2020-01-23 13:00:00' },
        { s: '2020-01-24 18:00:00', e: '2020-01-25 06:00:00' },
        { s: '2020-01-19 10:00:00', e: '2020-01-24 12:00:00' },
        { s: '2020-01-20 21:00:00', e: '2020-01-24 13:00:00' },
      ],
    },
    expected: ['2020-01-13', '2020-01-14', '2020-01-15', '2020-01-25', '2020-01-26'],
  },
  {
    data: {
      start: '2020-01-10 04:00:00',
      end: '2020-01-24 12:00:00',
      minTime: 10,
      scheduler: [
        { s: '2020-01-23 13:00:00', e: '2020-01-24 10:00:00' },
        { s: '2020-01-15 13:00:00', e: '2020-01-22 09:00:00' },
        { s: '2020-01-17 19:00:00', e: '2020-01-19 07:00:00' },
        { s: '2020-01-15 08:00:00', e: '2020-01-22 08:00:00' },
        { s: '2020-01-18 07:00:00', e: '2020-01-23 04:00:00' },
      ],
    },
    expected: ['2020-01-10', '2020-01-11', '2020-01-12', '2020-01-13', '2020-01-14'],
  },
  {
    data: {
      start: '2020-01-18 06:00:00',
      end: '2020-02-05 08:00:00',
      minTime: 8,
      scheduler: [
        { s: '2020-01-26 10:00:00', e: '2020-01-31 07:00:00' },
        { s: '2020-01-20 03:00:00', e: '2020-01-30 08:00:00' },
        { s: '2020-01-25 01:00:00', e: '2020-01-29 17:00:00' },
        { s: '2020-02-02 21:00:00', e: '2020-02-03 21:00:00' },
        { s: '2020-02-01 13:00:00', e: '2020-02-02 08:00:00' },
      ],
    },
    expected: ['2020-01-18', '2020-01-19', '2020-01-31', '2020-02-01', '2020-02-02', '2020-02-04'],
  },
  {
    data: {
      start: '2020-01-07 15:00:00',
      end: '2020-01-20 02:00:00',
      minTime: 7,
      scheduler: [
        { s: '2020-01-14 07:00:00', e: '2020-01-15 09:00:00' },
        { s: '2020-01-09 09:00:00', e: '2020-01-14 10:00:00' },
        { s: '2020-01-11 09:00:00', e: '2020-01-15 09:00:00' },
        { s: '2020-01-15 01:00:00', e: '2020-01-18 17:00:00' },
        { s: '2020-01-12 16:00:00', e: '2020-01-18 13:00:00' },
      ],
    },
    expected: ['2020-01-07', '2020-01-08', '2020-01-09', '2020-01-18', '2020-01-19'],
  },
  {
    data: {
      start: '2020-01-03 18:00:00',
      end: '2020-01-14 06:00:00',
      minTime: 1,
      scheduler: [
        { s: '2020-01-09 07:00:00', e: '2020-01-10 13:00:00' },
        { s: '2020-01-10 20:00:00', e: '2020-01-12 11:00:00' },
        { s: '2020-01-06 21:00:00', e: '2020-01-09 18:00:00' },
        { s: '2020-01-12 05:00:00', e: '2020-01-13 20:00:00' },
        { s: '2020-01-08 06:00:00', e: '2020-01-09 14:00:00' },
      ],
    },
    expected: [
      '2020-01-03',
      '2020-01-04',
      '2020-01-05',
      '2020-01-06',
      '2020-01-10',
      '2020-01-13',
      '2020-01-14',
    ],
  },
  {
    data: {
      start: '2020-01-06 17:00:00',
      end: '2020-01-08 03:00:00',
      minTime: 3,
      scheduler: [
        { s: '2020-01-07 13:00:00', e: '2020-01-07 20:00:00' },
        { s: '2020-01-07 03:00:00', e: '2020-01-07 11:00:00' },
        { s: '2020-01-07 06:00:00', e: '2020-01-07 20:00:00' },
        { s: '2020-01-07 14:00:00', e: '2020-01-07 05:00:00' },
        { s: '2020-01-07 20:00:00', e: '2020-01-07 21:00:00' },
      ],
    },
    expected: ['2020-01-06', '2020-01-07'],
  },
  {
    data: {
      start: '2020-01-16 05:00:00',
      end: '2020-01-29 01:00:00',
      minTime: 3,
      scheduler: [
        { s: '2020-01-27 21:00:00', e: '2020-01-28 22:00:00' },
        { s: '2020-01-19 15:00:00', e: '2020-01-21 22:00:00' },
        { s: '2020-01-27 21:00:00', e: '2020-01-28 10:00:00' },
        { s: '2020-01-25 07:00:00', e: '2020-01-27 13:00:00' },
        { s: '2020-01-25 01:00:00', e: '2020-01-26 18:00:00' },
      ],
    },
    expected: [
      '2020-01-16',
      '2020-01-17',
      '2020-01-18',
      '2020-01-19',
      '2020-01-22',
      '2020-01-23',
      '2020-01-24',
      '2020-01-27',
    ],
  },
  {
    data: {
      start: '2020-01-20 07:00:00',
      end: '2020-02-08 19:00:00',
      minTime: 17,
      scheduler: [
        { s: '2020-02-06 08:00:00', e: '2020-02-07 21:00:00' },
        { s: '2020-02-01 14:00:00', e: '2020-02-06 17:00:00' },
        { s: '2020-01-29 14:00:00', e: '2020-02-01 20:00:00' },
        { s: '2020-02-02 14:00:00', e: '2020-02-03 14:00:00' },
        { s: '2020-01-27 05:00:00', e: '2020-02-01 20:00:00' },
      ],
    },
    expected: [
      '2020-01-20',
      '2020-01-21',
      '2020-01-22',
      '2020-01-23',
      '2020-01-24',
      '2020-01-25',
      '2020-01-26',
      '2020-02-08',
    ],
  },
  {
    data: {
      start: '2020-01-05 14:00:00',
      end: '2020-01-16 10:00:00',
      minTime: 13,
      scheduler: [
        { s: '2020-01-09 07:00:00', e: '2020-01-11 14:00:00' },
        { s: '2020-01-07 13:00:00', e: '2020-01-12 21:00:00' },
        { s: '2020-01-08 20:00:00', e: '2020-01-13 14:00:00' },
        { s: '2020-01-11 04:00:00', e: '2020-01-13 17:00:00' },
        { s: '2020-01-09 05:00:00', e: '2020-01-14 11:00:00' },
      ],
    },
    expected: ['2020-01-06', '2020-01-07', '2020-01-14', '2020-01-15'],
  },
  {
    data: {
      start: '2020-01-12 09:00:00',
      end: '2020-01-13 04:00:00',
      minTime: 4,
      scheduler: [
        { s: '2020-01-13 19:00:00', e: '2020-01-12 15:00:00' },
        { s: '2020-01-13 04:00:00', e: '2020-01-13 11:00:00' },
        { s: '2020-01-13 15:00:00', e: '2020-01-12 20:00:00' },
        { s: '2020-01-12 08:00:00', e: '2020-01-12 16:00:00' },
        { s: '2020-01-12 13:00:00', e: '2020-01-12 21:00:00' },
      ],
    },
    expected: [],
  },
  {
    data: {
      start: '2020-01-20 04:00:00',
      end: '2020-02-04 02:00:00',
      minTime: 8,
      scheduler: [
        { s: '2020-01-22 15:00:00', e: '2020-01-31 20:00:00' },
        { s: '2020-01-27 02:00:00', e: '2020-02-02 13:00:00' },
        { s: '2020-01-22 08:00:00', e: '2020-01-31 21:00:00' },
        { s: '2020-02-01 09:00:00', e: '2020-02-02 19:00:00' },
        { s: '2020-01-25 05:00:00', e: '2020-01-28 07:00:00' },
      ],
    },
    expected: ['2020-01-20', '2020-01-21', '2020-01-22', '2020-02-03'],
  },
  {
    data: {
      start: '2020-01-12 12:00:00',
      end: '2020-01-13 08:00:00',
      minTime: 4,
      scheduler: [
        { s: '2020-01-12 12:00:00', e: '2020-01-12 16:00:00' },
        { s: '2020-01-12 12:00:00', e: '2020-01-12 20:00:00' },
      ],
    },
    expected: ['2020-01-12', '2020-01-13'],
  },
  // ...generateTests(100),
]

// const currentCase = 20
// console.log(
//   getAnswerForTest(bruteForceByHour(testCases[currentCase].data), testCases[currentCase].data),
// )
// console.log(testCases[currentCase].expected)
// console.log(bruteForceByHour(testCases[currentCase].data))

let testBroken = false

testCases.forEach(({ data, expected }, index) => {
  if (testBroken) return
  console.log(`Test#${index + 1}:`)
  const programAnswer = getFreeDays(data)
  if (!expected) {
    expected = getAnswerForTest(bruteForceByHour(data), data)
  }
  if (_.isEqual(programAnswer, expected)) console.log('OK')
  else {
    console.log(data)
    console.log('WA')
    console.log('Expected:')
    console.log(expected)
    console.log('Your:')
    // console.log(programAnswer)
    programAnswer.forEach(({ date, full }) => {
      if (!full) console.log(date)
    })
    console.log('Free ranges:')
    console.log(bruteForceByHour(data))
    testBroken = true
    return
  }

  console.log('-'.repeat(100))
})
