import { isCorrectEmail } from './correctEmail';

describe('Correct email function', () => {
  test('should return true', () => {
    const input = 'vad.alkhimenok.gmail.com';
    const expected = isCorrectEmail(input);
    expect(expected).toBeTruthy();
  });

  test('should return false', () => {
    const input = 'vad.alkhimenok@gmail.com';
    const expected = isCorrectEmail(input);
    expect(expected).toBeFalsy();
  });
});
