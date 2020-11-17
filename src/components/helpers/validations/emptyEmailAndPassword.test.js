import { isEmptyEmailAndPassword } from './emptyEmailAndPassword';

describe('Is empty email and password function', () => {
  it('should return true if there is not password and email', () => {
    const inputEmail = '';
    const inputPassword = '';
    const expected = isEmptyEmailAndPassword(inputEmail, inputPassword);
    expect(expected).toBeTruthy();
  });

  it('should return false if there is password and email', () => {
    const inputEmail = 'vad.alkhimenok@gmail.com';
    const inputPassword = 'Vadim1234';
    const expected = isEmptyEmailAndPassword(inputEmail, inputPassword);
    expect(expected).toBeFalsy();
  });
})