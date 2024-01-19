const memo: number[] = [];

function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  if(memo[n] !== undefined) {
    return memo[n];
  }
  memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
  return memo[n];
}

export function fibonacciSequence(n: number): number[] {
  const sequence: number[] = [];
  for (let i = 0; i < n; i++) {
    sequence.push(fibonacci(i));
  }
  return sequence;
}