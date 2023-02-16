import { array } from "yup"

export const formatDate = (dt :Date, withTime :boolean) => {
  let y = dt.getFullYear()
  let m = ('00' + (dt.getMonth()+1)).slice(-2)
  let d = ('00' + dt.getDate()).slice(-2)
  let result = y + '-' + m + '-' + d
  if(withTime) {
    let h = dt.getHours().toString().padStart(2, '0')
    let m = dt.getMinutes().toString().padStart(2, '0')
    result = result + ' ' + h + ':' + m
  }
  return result;
}
export const convertMealType = (mealType :Number) => {
  return mealType == 0 ? '家' : '外'
}

export const makeTagOptions = (tags :Array<any>) => {
  let result = <Array<String>>([])
  tags.forEach((tag :any) => {
    result.push(tag.name)
  })
  return result
}