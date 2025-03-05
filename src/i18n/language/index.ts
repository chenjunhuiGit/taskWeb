import langData from './data.json'

// 语言配置表
export const languageList = {
  // 英语
  'en-US': {
    name: 'English',
    value: 'en-US'
  },
  // 简体中文
  'zh-CN': {
    name: '简体中文',
    value: 'zh-CN'
  },
  // 阿拉伯语
  'ar-SA': {
    name: 'عربي',
    value: 'ar-SA'
  },
  // 法语
  'fr-FR': {
    name: 'Français',
    value: 'fr-FR'
  },
  // 西班牙语
  'es-ES': {
    name: 'español',
    value: 'es-ES'
  },
  // 葡萄牙语（巴西）
  'pt-BR': {
    name: 'Português (Brasil)',
    value: 'pt-BR'
  },
  // 阿姆哈拉语
  'Amharic': {
    name: 'አማርኛ',
    value: 'Amharic'
  }
}

// 语言key列表
export const languageKeys = Object.keys(languageList)
// 当前语言环境
export const currentLocale = window?.localStorage?.getItem('language') || languageKeys[0]
// 当前语言集合
export const getLanguageGroup = () => {
  const _lang = {}
  languageKeys.map((lanKey: string) => {
    _lang[lanKey] = langData[lanKey]
  })
  return _lang
}
