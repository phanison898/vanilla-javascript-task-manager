export function trueOrFalse() {
  let condition;
  const seed = Math.floor(Math.random() * 2);
  if (seed === 0) {
    condition = false;
  } else if (seed === 1) {
    condition = true;
  }
  return condition;
}
