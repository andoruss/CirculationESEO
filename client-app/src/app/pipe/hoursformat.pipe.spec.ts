import { Hoursformat } from "./hoursformat.pipe";

describe('Hoursformat', () => {
  it('create an instance', () => {
    const pipe = new Hoursformat();
    expect(pipe).toBeTruthy();
  });
});
