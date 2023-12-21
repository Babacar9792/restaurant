import { MonthYearDatePipe } from './month-year-date.pipe';

describe('MonthYearDatePipe', () => {
  it('create an instance', () => {
    const pipe = new MonthYearDatePipe();
    expect(pipe).toBeTruthy();
  });
});
