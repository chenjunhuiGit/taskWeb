// 校验规则类型
type Validator = (value: string) => boolean

// 必填字段校验
export const isRequired: Validator = (value) => {
  return value.toString().trim().length > 0
}

// 邮箱校验
export const isEmail: Validator = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

// 手机号校验（以中国的手机号为例）
export const isPhoneNumber: Validator = (value) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(value)
}

// 密码强度校验（至少8个字符，包含字母和数字）
export const isStrongPassword: Validator = (value) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return passwordRegex.test(value)
}

// 自定义最小长度校验
export const minLength = (min: number): Validator => {
  return (value) => {
    return value.length >= min
  }
}

// 自定义最大长度校验
export const maxLength = (max: number): Validator => {
  return (value) => {
    return value.length <= max
  }
}

// 数字校验
export const isNumber: Validator = (value) => {
  return !isNaN(Number(value))
}

// 自定义正则校验
export const matchesRegex = (regex: RegExp): Validator => {
  return (value) => {
    return regex.test(value)
  }
}
