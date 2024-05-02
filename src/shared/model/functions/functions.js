export const convertPopulation = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const ucFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

export const getNestingObj = (obj) => {
  let result = '';
  for (let key in obj) {
    for (let k in obj[key]) {
      result = obj[key][k]
      break
    }
    break
  }
  return result
}