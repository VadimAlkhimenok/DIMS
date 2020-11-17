import { isEmptyInputModal } from './emptyInputModal';

describe('Empty input modal function', () => {
  it('should return is all inputs equal to false', () => {
    const input = {key1: "", key2: "", key3: "", key4: "", key5: null};
    const expected = isEmptyInputModal(input);
    expect(expected).toBeTruthy();
  });

  it('should return is all inputs equal to true', () => {
    const input = {key1: "abc", key2: "abc", key3: "abc", key4: "abc", key5: 'abc'};
    const expected = isEmptyInputModal(input);
    expect(expected).toBeFalsy();
  });
})