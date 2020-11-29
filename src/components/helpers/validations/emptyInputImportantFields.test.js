import { isEmptyInputImportantFields } from './emptyInputImportantFields';

describe('Check important inputs function', () => {
  it('should return if all inputs equal to an empty string', () => {
    const input = ['', '', '', '', ''];
    const expected = isEmptyInputImportantFields(input);
    expect(expected).toBeFalsy();
  });

  it('should return if even one input not equal to an empty string', () => {
    const input = ['', 'text', '', '', 'text'];
    const expected = isEmptyInputImportantFields(input);
    expect(expected).toBeTruthy();
  });
});
