export const queryParams = (params: any) => {
  let arr: any = []
  for(let key in params) {
    if(params[key]) {
      arr.push(`${key}=${params[key]}`)
    }
  }

  if (arr.length > 0) {
    let str = '?'
    str += arr.join('&')

    return str
  } else {
    return ''
  }
}

export const postParams = (params: any) => {
  let obj = JSON.parse(JSON.stringify(params))

  for (let key in obj) {
    if(!params[key]) {
      delete obj[key]
    }
  }

  return obj
}