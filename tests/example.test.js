/**
 * Example test file.
 *
 * Replace or extend this file with your actual test suite.
 * This file exists to ensure CI has at least one passing test on a fresh clone.
 */

describe('Starter template sanity check', () => {
  it('should run a basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  it('should confirm Node.js environment is available', () => {
    expect(typeof process).toBe('object');
    expect(process.version).toBeTruthy();
  });
});
