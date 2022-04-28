import { UsernameValidation } from './username.validation';

describe('UsernameValidation', () => {
  it('should create an instance', () => {
    const directive = new UsernameValidation();
    expect(directive).toBeTruthy();
  });
});
