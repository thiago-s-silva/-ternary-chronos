import Chronos from '../src/index'

/* Mocks */
// Constants
const dateSpie = jest.fn().mockImplementation(() => mockedDate)
const mockedNewDate = '2020-01-01T08:45:00.000Z'
const mockedDate = new Date(mockedNewDate)
const _Date = Date

describe('Chronos Unit Testing', () => {
  describe('smoke tests', () => {
    beforeAll(() => {
      // eslint-disable-next-line
      // @ts-ignore
      global.Date = dateSpie
      global.Date.UTC = _Date.UTC
      global.Date.parse = _Date.parse
      global.Date.now = _Date.now
    })

    it('should exist Chronos', () => {
      expect(Chronos).toBeDefined()
    })
  })
  describe('unit tests', () => {
    describe('constructor params', () => {
      describe('when passing d param', () => {
        it('should return a new Chronos instance with the passed date', () => {
          const chronos = new Chronos({
            d: new Date('2020-01-01T08:45:00.000Z'),
          })
          expect(chronos.date).toBe(new Date('2020-01-01T08:45:00.000Z'))
        })
      })
      describe('when passing days param', () => {
        it('should return a new Chronos instance with the passed days when adding days', () => {
          const chronos = new Chronos({
            days: 1,
          })
          expect(chronos.date).toBe(new Date('2020-01-02T08:45:00.000Z'))
        })
        it('should return a new Chronos instance with the passed days when subtracting days', () => {
          const chronos = new Chronos({
            days: -1,
          })
          expect(chronos.date).toBe(new Date('2019-12-31T08:45:00.000Z'))
        })
      })
      describe('when passing months param', () => {
        it('should return a new Chronos instance with the passed months when adding months', () => {
          const chronos = new Chronos({
            months: 1,
          })
          expect(chronos.date).toBe(new Date('2020-02-01T08:45:00.000Z'))
        })
        it('should return a new Chronos instance with the passed months when subtracting months', () => {
          const chronos = new Chronos({
            months: -1,
          })
          expect(chronos.date).toBe(new Date('2019-12-01T08:45:00.000Z'))
        })
      })
      describe('when passing years param', () => {
        it('should return a new Chronos instance with the passed years when adding years', () => {
          const chronos = new Chronos({
            years: 1,
          })
          expect(chronos.date).toBe(new Date('2021-01-01T08:45:00.000Z'))
        })
        it('should return a new Chronos instance with the passed years when subtracting years', () => {
          const chronos = new Chronos({
            years: -1,
          })
          expect(chronos.date).toBe(new Date('2019-01-01T08:45:00.000Z'))
        })
      })
      describe('when passing hours param', () => {
        it('should return a new Chronos instance with the passed hours when adding hours', () => {
          const chronos = new Chronos({
            hours: 1,
          })
          expect(chronos.date).toBe(new Date('2020-01-01T09:45:00.000Z'))
        })
        it('should return a new Chronos instance with the passed hours when subtracting hours', () => {
          const chronos = new Chronos({
            hours: -1,
          })
          expect(chronos.date).toBe(new Date('2020-01-01T07:45:00.000Z'))
        })
      })
      describe('when passing minutes param', () => {
        it('should return a new Chronos instance with the passed minutes when adding minutes', () => {
          const chronos = new Chronos({
            minutes: 1,
          })
          expect(chronos.date).toBe(new Date('2020-01-01T08:46:00.000Z'))
        })
        it('should return a new Chronos instance with the passed minutes when subtracting minutes', () => {
          const chronos = new Chronos({
            minutes: -1,
          })
          expect(chronos.date).toBe(new Date('2020-01-01T08:44:00.000Z'))
        })
      })
      describe('when passing seconds param', () => {
        it('should return a new Chronos instance with the passed seconds when adding seconds', () => {
          const chronos = new Chronos({
            seconds: 1,
          })
          expect(chronos.date).toBe(new Date('2020-01-01T08:45:01.000Z'))
        })
        it('should return a new Chronos instance with the passed seconds when subtracting seconds', () => {
          const chronos = new Chronos({
            seconds: -1,
          })
          expect(chronos.date).toBe(new Date('2020-01-01T08:44:59.000Z'))
        })
      })
      describe('when passing milliseconds param', () => {
        it('should return a new Chronos instance with the passed milliseconds when adding milliseconds', () => {
          const chronos = new Chronos({
            milliseconds: 1,
          })
          expect(chronos.date).toBe(new Date('2020-01-01T08:45:00.001Z'))
        })
        it('should return a new Chronos instance with the passed milliseconds when subtracting milliseconds', () => {
          const chronos = new Chronos({
            milliseconds: -1,
          })
          expect(chronos.date).toBe(new Date('2020-01-01T08:44:59.999Z'))
        })
      })
      describe('when passing customTime param', () => {
        it('should return a new Chronos instance with the passed customTime', () => {
          const chronos = new Chronos({
            customTime: '08:45:00.000',
          })
          expect(chronos.date).toBe(new Date('2020-01-01T08:45:00.000Z'))
        })
      })
    })
    describe('getCurrentMonth', () => {
      it('should return the current month', () => {
        const chronos = new Chronos()
        expect(chronos.getCurrentMonth()).toBe(1)
      })
    })
    describe('getCurrentMonthString', () => {
      it('should return the current month as a string', () => {
        const chronos = new Chronos()
        expect(chronos.getCurrentMonthString()).toBe('01')
      })
    })
    describe('getCurrentMonthName', () => {
      it('should return the current month name', () => {
        const chronos = new Chronos()
        expect(chronos.getCurrentMonthName()).toBe('January')
      })
    })
    describe('getDayString', () => {
      it('should return the current day as a string', () => {
        const chronos = new Chronos()
        expect(chronos.getDayString()).toBe('01')
      })
    })
    describe('getHourString', () => {
      it('should return the current hour as a string', () => {
        const chronos = new Chronos()
        expect(chronos.getHourString()).toMatchObject({ EST: '06', UTC: '11' })
      })
    })
    describe('getHour', () => {
      it('should return the current hour', () => {
        const chronos = new Chronos()
        expect(chronos.getHour()).toMatchObject({ EST: 6, UTC: 11 })
      })
    })
    describe('getMinuteString', () => {
      it('should return the current minutes as a string', () => {
        const chronos = new Chronos()
        expect(chronos.getMinuteString()).toBe('45')
      })
    })
    describe('getYearMonth', () => {
      it('should return the current year and month', () => {
        const chronos = new Chronos()
        expect(chronos.getYearMonth()).toBe('2020-01')
      })
    })
    describe('getYearMonthDay', () => {
      it('should return the current year, month and day', () => {
        const chronos = new Chronos()
        expect(chronos.getYearMonthDay()).toBe('2020-01-01')
      })
    })
    describe('isWeekend', () => {
      describe('when the current day is not a weekend day', () => {
        it('should return false', () => {
          const chronos = new Chronos({
            d: new Date('2020-01-01T08:45:00.000Z'),
          })
          expect(chronos.isWeekend()).toBe(false)
        })
      })
    })
  })
})
