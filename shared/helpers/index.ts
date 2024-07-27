export const range = (n: number, start:number = 0): Array<number> => {
  const iArr = Array(n).keys()
  const rangedNumbers = []

  let isDone: boolean | undefined = false;
  while(!isDone) {
    const { value, done } = iArr.next();
    if (!done) {
      rangedNumbers.push(value + start)
    }
    isDone = done
  }

  return rangedNumbers
}

export const isEmptyObject = (data: object) => {
  return !Object.keys(data).length
}
