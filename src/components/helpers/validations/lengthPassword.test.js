import { isLengthPassword } from './lengthPassword';

describe('Length of password function', () => {
  it('should return if password more than 6 symbols', () => {
    const input = 'Vadim1234';
    const expected = isLengthPassword(input);
    expect(expected).toBeFalsy();
  });

  it('should return if password less than 6 symbols', () => {
    const input = 'Vad12';
    const expected = isLengthPassword(input);
    expect(expected).toBeTruthy();
  });
})