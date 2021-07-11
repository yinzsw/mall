/**
 * 防抖函数
 */
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * 格式化日期
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (const oKey in o) {
    if (new RegExp(`(${oKey})`).test(fmt)) {
      const str = o[oKey] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str :`00${str}`.substr(str.length))
    }
  }
  return fmt
}


