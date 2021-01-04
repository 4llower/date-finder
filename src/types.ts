interface InputData {
  start: string
  end: string
  minTime: number
  scheduler: {
    s: string
    e: string
  }[]
}

interface TestCase {
  data: InputData
  expected?: string[]
}
