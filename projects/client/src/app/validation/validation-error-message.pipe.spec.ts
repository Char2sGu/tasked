import { ValidationErrorMessagePipe } from './validation-error-message.pipe';

describe('ValidationErrorMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidationErrorMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
