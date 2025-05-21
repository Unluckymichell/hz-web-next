export default function mathOnlyEval(code: string) {
  // Check if the code contains any non-math characters
  const mathOnlyPattern = /^[0-9+\-*/().\s]*$/;
  if (!mathOnlyPattern.test(code)) {
    throw new Error(
      "Invalid input: Only mathematical expressions are allowed."
    );
  }

  // Evaluate the expression using eval
  try {
    const result = eval(code);
    return result;
  } catch (error) {
    throw new Error("Error evaluating expression: " + error);
  }
}
