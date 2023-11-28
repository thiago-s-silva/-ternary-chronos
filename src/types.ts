export type THourString = {
  UTC: string
  EST: string
}

export type THour = {
  UTC: number
  EST: number
}

export interface IChronos extends Date {
  date: Date
  getCurrentMonth: () => number
  getCurrentMonthString: () => string
  getCurrentMonthName: () => string
  getDayString: () => string
  getHourString: () => THourString
  getHour: () => THour
  getMinuteString: () => string
  getYearMonth: () => string
  getYearMonthDay: () => string
  isWeekend: () => boolean
  getNextBusinessDay: () => string | IChronos
}

export interface IChronosConstructorArgs {
  d?: Date
  days?: number
  months?: number
  years?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
  midnight?: boolean
  customTime?: string
}
