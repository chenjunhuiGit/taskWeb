class Countdown {
  private duration: number // 总倒计时时间（秒）
  private remainingTime: number // 剩余时间（秒）
  private isFormat: boolean // 是否进行时分秒格式化
  private intervalId: NodeJS.Timeout | null // setInterval 的 ID
  private onSetDuration: ((remainingSeconds: number) => void) | null = null // 动态设置总秒数
  private onTickCallback: (remainingTime: string) => void // 每秒调用的回调函数
  private onCompleteCallback: () => void // 完成时调用的回调函数

  constructor(duration: number, isFormat: boolean, onTickCallback: (remainingTime: string) => void, onCompleteCallback: () => void) {
    this.duration = duration
    this.isFormat = isFormat
    this.remainingTime = duration
    this.intervalId = null
    this.onTickCallback = onTickCallback
    this.onCompleteCallback = onCompleteCallback
  }

  // 开始倒计时
  start() {
    if (this.intervalId !== null) {
      console.warn('倒计时已经在运行中')
      return
    }

    this.intervalId = setInterval(() => {
      this.remainingTime -= 1
      this.onTickCallback(this.formatTime(this.remainingTime))

      if (this.remainingTime <= 0) {
        this.stop()
        this.onCompleteCallback()
      }
    }, 1000)
  }

  // 停止倒计时
  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
      this.remainingTime = this.duration
    }
  }

  // 重置倒计时
  reset() {
    this.stop()
    this.remainingTime = this.duration
  }

  // 动态修改倒计时的总秒数
  setDuration(seconds: number) {
    this.duration = seconds
    this.remainingTime = seconds
    if (this.onSetDuration) {
      this.onSetDuration(this.remainingTime)
    }
  }

  // 获取当前剩余时间
  getRemainingTime() {
    return this.formatTime(this.remainingTime)
  }

  // 将秒数格式化为 hh:mm:ss
  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = secs.toString().padStart(2, '0')

    if (this.isFormat) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    } else {
      return `${seconds}`
    }
  }
}

const preventSpaces = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\s+/g, '')
}

const number0_9 = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/[^0-9]/g, '')
  input.value = input.value.replace(/\s+/g, '')
}

// 复制文字
const clipboard = (str) => {
  let isClipboard = false
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str)
    isClipboard = true
  } else {
    //创建输入框
    const input = document.createElement('input')
    input.value = str
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    //移除
    document.body.removeChild(input)
    isClipboard = true
  }
  return isClipboard
}

const toFixedNumber = (num: number, max: number) => {
  // 转换为字符串以处理浮点数精度问题
  const numStr = num.toString()

  // 找到小数点的位置
  const decimalIndex = numStr.indexOf('.')

  // 如果没有小数点，或者小数点后的数字不超过max位，直接返回原值
  if (decimalIndex === -1 || numStr.length - decimalIndex - 1 <= max) {
    return numStr
  }

  // 保留max位小数并移除末尾的多余0
  return num.toFixed(max).replace(/\.?0+$/, '')
}

const maskEmail = (email: string) => {
  // 使用正则表达式验证邮箱格式
  const regex = /^(\w{3})([\w.-]*)(@[\w.-]+\.\w+)$/
  const match = email.match(regex)

  if (match) {
    const firstChar = match[1] // 邮箱地址的前三个字符
    const domain = match[3] // 域名部分

    // 根据邮箱地址的长度生成相应数量的 *
    const maskedMiddle = match[2].replace(/./g, '*')

    // 返回脱敏后的邮箱地址
    return `${firstChar}${maskedMiddle}${domain}`
  } else {
    // 如果不是有效的邮箱格式，抛出错误或返回原值
    // throw new Error('Invalid email format')
  }
}

export { Countdown, preventSpaces, clipboard, toFixedNumber, maskEmail, number0_9 }
