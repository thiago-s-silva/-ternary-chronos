import { IChronos, IChronosConstructorArgs, THour, THourString } from './types'

export default class Chronos extends Date implements IChronos {
  public date: Date

  constructor(args?: IChronosConstructorArgs) {
    const {
      d = new Date(), // A custom date to use instead of the current date
      days = 0, // The number of days to add to the date
      months = 0, // The number of months to add to the date
      years = 0, // The number of years to add to the date
      hours = 0, // The number of hours to add to the date
      minutes = 0, // The number of minutes to add to the date
      seconds = 0, // The number of seconds to add to the date
      milliseconds = 0, // The number of milliseconds to add to the date
      midnight = false, // If true, hours, minutes, seconds, and milliseconds will be set to 0
      customTime = undefined, // A custom time to use instead of the current time
    } = args || {}

    // Calculate the time to use
    d.setDate(d.getDate() + days)
    d.setMonth(d.getMonth() + months)
    d.setFullYear(d.getFullYear() + years)
    d.setHours(d.getHours() + hours)
    d.setMinutes(d.getMinutes() + minutes)
    d.setSeconds(d.getSeconds() + seconds)
    d.setMilliseconds(d.getMilliseconds() + milliseconds)

    // Set the time to midnight
    if (midnight) {
      d.setSeconds(0)
      d.setMilliseconds(0)
    }

    if (customTime) {
      // regex to validate the customTime pattern: 08:45:00.000
      const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9].[0-9]{3}$/
      if (!regex.test(customTime))
        throw new Error(
          'Invalid customTime format, it should be for example 08:45:00.000',
        )

      const [hours, minutes, seconds] = customTime.split(':')
      const milliseconds = customTime.split('.')[1]

      d.setHours(+hours)
      d.setMinutes(+minutes)
      d.setSeconds(+seconds)
      d.setMilliseconds(+milliseconds)
    }

    super(d)
    this.date = d
  }

  /**
   * Returns the current month (1-12)
   * @returns {number}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getCurrentMonth() // 1
   */
  public getCurrentMonth(): number {
    return this.date.getMonth() + 1
  }

  /**
   * Returns the current month as a string (01-12)
   * @returns {string}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getCurrentMonthString() // '01'
   */
  public getCurrentMonthString(): string {
    return `${this.getCurrentMonth()}`.padStart(2, '0')
  }

  /**
   * Returns the current month name
   * @returns {string}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getCurrentMonthName() // 'January'
   */
  public getCurrentMonthName(): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return months[this.date.getMonth()]
  }

  /**
   * Returns the current day as a string (01-31)
   * @returns {string}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getDayString() // '01'
   */
  public getDayString(): string {
    return `${this.date.getDate()}`.padStart(2, '0')
  }

  /**
   * Return current hour parsed to string in UTC and EST timezones
   * @returns {THourString}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getHourString() // { UTC: '08', EST: '03' }
   * chronos.getHourString().UTC // '08'
   * chronos.getHourString().EST // '03'
   */
  public getHourString(): THourString {
    const utc = `${this.getUTCHours()}`.padStart(2, '0')
    const est = `${this.getUTCHours() - 5}`.padStart(2, '0')
    return { UTC: utc, EST: est }
  }

  /**
   * Return current hour parsed to number in UTC and EST timezones
   * @returns {THour}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getHour() // { UTC: 8, EST: 3 }
   * chronos.getHour().UTC // 8
   * chronos.getHour().EST // 3
   */
  public getHour(): THour {
    return {
      UTC: this.date.getUTCHours(),
      EST: +this.date.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        hour12: false,
      }),
    }
  }

  /**
   * Returns the current minute as a string (00-59)
   * @returns {string}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getMinuteString() // '00'
   */
  public getMinuteString(): string {
    return `${this.date.getMinutes()}`.padStart(2, '0')
  }

  /**
   * Returns the current year and month as a string (2020-01)
   * @returns {string}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getYearMonth() // '2020-01'
   */
  public getYearMonth(): string {
    return `${this.getFullYear()}-${this.getCurrentMonthString()}`
  }

  /**
   * Returns the current year, month and day as a string (2020-01-01)
   * @returns {string}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getYearMonthDay() // '2020-01-01'
   */
  public getYearMonthDay(): string {
    return `${this.getYearMonth()}-${this.getDayString()}`
  }

  /**
   * Returns true if the current day is a weekend day
   * @returns {boolean}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.isWeekend() // false
   */
  public isWeekend(): boolean {
    const day = this.date.getDay()
    return day === 6 || day === 0
  }

  /**
   * Returns the next business day
   * @returns {string}
   * @memberof Chronos
   * @example
   * const chronos = new Chronos()
   * chronos.getNextBusinessDay() // '2020-01-02'
   */
  public getNextBusinessDay(): string | Chronos {
    const nextDay = new Chronos({ d: this.date, days: 1 })
    return nextDay.isWeekend() ? nextDay.getNextBusinessDay() : nextDay
  }
}
