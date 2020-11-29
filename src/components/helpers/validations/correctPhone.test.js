import { isCorrectPhone } from './correctPhone';

describe('Correct email function', () => {
  test('should return true', () => {
    const input = '+375(29)5278217';
    const expected = isCorrectPhone(input);
    expect(expected).toBeTruthy();
  });

  test('should return false', () => {
    const input = 'vadimasdf';
    const expected = isCorrectPhone(input);
    console.log('expected: ', expected);
    expect(expected).toBeFalsy();
  });
});
