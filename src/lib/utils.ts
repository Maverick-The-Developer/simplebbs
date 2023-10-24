export function UTC2Local(utcDateStr: string):string {
  const tempDate = new Date(utcDateStr)
  const newDateStr = `${tempDate.getFullYear()}-${String(
    tempDate.getMonth() + 1
  ).padStart(2, '0')}-${String(tempDate.getDate()).padStart(2, '0')}`
  return newDateStr
}
