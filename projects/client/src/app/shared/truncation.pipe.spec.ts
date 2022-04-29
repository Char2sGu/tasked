import { TruncationPipe } from './truncation.pipe';

describe('TruncationPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncationPipe();
    expect(pipe).toBeTruthy();
  });
});
