import { calculateAge } from './caluculateAge';

describe('Calculate age function', () => {
  test('should calculate age with getting data', () => {
    const input = '1994-09-12';
    const output = 26;

    expect(calculateAge(input)).toEqual(output);
  });
});