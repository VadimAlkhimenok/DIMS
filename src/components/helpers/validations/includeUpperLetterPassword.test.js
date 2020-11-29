import { isPasswordIncludeUpper } from './includeUpperLetterPassword';

describe('Include upper letter password function', () => {
  it('should return if password includes upper letter', () => {
    const input = 'Vadim1234';
    const expected = isPasswordIncludeUpper(input);
    expect(expected).toBeFalsy();
  });

  it('should return if password does not include upper letter', () => {
    const input = 'vadim1234';
    const expected = isPasswordIncludeUpper(input);
    expect(expected).toBeTruthy();
  });
});
