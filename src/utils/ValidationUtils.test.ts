import { validatePassword } from './ValidationUtils';

describe('validatePassword', () => {
  test('validates a password with all required criteria', () => {
    const validPassword = 'Password1!';
    expect(validatePassword(validPassword)).toBe(true);
  });

  test('fails a password that is too short', () => {
    const shortPassword = 'Pass1!';
    expect(validatePassword(shortPassword)).toBe(false);
  });

  test('fails a password without an uppercase letter', () => {
    const noUpperCasePassword = 'password1!';
    expect(validatePassword(noUpperCasePassword)).toBe(false);
  });

  test('fails a password without a lowercase letter', () => {
    const noLowerCasePassword = 'PASSWORD1!';
    expect(validatePassword(noLowerCasePassword)).toBe(false);
  });

  test('fails a password without a digit', () => {
    const noDigitPassword = 'Password!';
    expect(validatePassword(noDigitPassword)).toBe(false);
  });

  test('fails a password without a special character', () => {
    const noSpecialCharPassword = 'Password1';
    expect(validatePassword(noSpecialCharPassword)).toBe(false);
  });
});