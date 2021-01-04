import { bruteForceByHour, getAnswerForTest } from './bruteForceByHour'
import { getFreeDays } from './getFreeDays'
import _ from 'lodash'
// import { generateTests } from './generateTests'

const testCases: TestCase[] = [
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
  // ...generateTests(100),
]

let testBroken = false

testCases.forEach(({ data, expected }, index) => {
  if (testBroken) return
  console.log(`Test#${index + 1}:`)
  const programAnswer = getFreeDays(data)
  // if (!expected) {
  //   expected = getAnswerForTest(bruteForceByHour(data), data)
  // }
  if (_.isEqual(programAnswer.sort(), expected.sort())) console.log('OK')
  else {
    console.log('WA')
    console.log('Expected:')
    console.log(expected)
    console.log('Your:')
    console.log(programAnswer)
    console.log('Free ranges:')
    console.log(bruteForceByHour(data))
    testBroken = true
    return
  }
  console.log('-'.repeat(100))
})
