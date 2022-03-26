export const isValueInBetween = (value: number, num1: number, num2: number) => {
  if (num1 >= num2) {
    return value <= num1 && value >= num2
  }
  return value >= num1 && value <= num2
}
