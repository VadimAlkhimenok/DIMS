import { chooseStateTask } from './chooseStateTask';

describe('Choose state of task function', () => {
  it ('should return chosen status of task', () => {
    const text = 'Success';
    const active = 'Active';
    const fail = 'Fail';
    const def = 'Def';
    const success = 'Success';

    const expected = chooseStateTask(text, active, fail, def, success);

    expect(expected).toEqual(success);
  });

  it ('should return status of task by default', () => {
    const text = 'example';
    const active = 'Active';
    const fail = 'Fail';
    const def = 'Def';
    const success = 'Success';

    const expected = chooseStateTask(text, active, fail, def, success);

    expect(expected).toEqual(def);
  });
});