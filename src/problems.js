export const problems = [
{
  id: 1,
  title: "Sum of Two Numbers",
  description: "Given two integers A and B, return their sum.",
  input_format: "Two integers A and B",
  output_format: "A single integer, the sum of A and B",
  constraints: "1 <= A, B <= 1000",
  sample_input: "2 3",
  sample_output: "5",
  starter_code: "int main() {\n  // your code here\n  return 0;\n}",
  test_cases: JSON.stringify([
    { input: "2 3", expected_output: "5" },
    { input: "10 20", expected_output: "30" }
  ]),
  language_id: 50, // C
},

  {
    id: 2,
    title: "Even or Odd",
    description: "Check if a number is even or odd.",
    starterCode: "n = int(input())\n# Your code here",
    expectedOutput: "Even",
    languageId: 71
  },
  {
    id: 3,
    title: "Find Factorial",
    description: "Write a program to find the factorial of a number.",
    starterCode: `def factorial(n):\n    # Your code here\n\nn = int(input())\nprint(factorial(n))`,
    expectedOutput: "120",
    languageId: 71
  }
];
