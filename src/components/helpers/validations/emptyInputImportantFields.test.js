import { isEmptyInputImportantFields } from './emptyInputImportantFields';

describe('Check important inputs function', () => {
  it('should return if all inputs equal to an empty string', () => {
    const input = ["", "", "", "", ""];
    const expected = isEmptyInputImportantFields(input);
    expect(expected).toBeFalsy();
  });
})