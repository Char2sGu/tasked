import { PasswordValidation } from './password.validation';

describe('PasswordValidation', () => {
  it('should create an instance', () => {
    const directive = new PasswordValidation();
    expect(directive).toBeTruthy();
  });
});
