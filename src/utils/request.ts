import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { showToast } from 'vant'
import router from '@/router'
import i18n from '@/i18n/index'

class HttpRequest {
  private readonly baseUrl: string
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl, // 所有的请求地址前缀部分(没有后端请求不用写)
      timeout: 8000000 // 请求超时时间(毫秒)
      // withCredentials: true,// 跨域请求时发送cookies
      // headers: {
      // 设置后端需要的传参类型
      // 'Content-Type': 'application/json',
      // 'token': x-auth-token',//一开始就要token
      // 'X-Requested-With': 'XMLHttpRequest',
      // },
    }
    return config
  }

  // 请求拦截
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    instance.interceptors.request.use(
      (config) => {
        // 请求头携带token
        const token: string | undefined = Cookies.get('token')
        if (token) {
          config.headers['Authorization'] = token
        }
        // 上传接口使用multipart/form-data
        if (config.url == '/storage/img/upload') {
          config.headers['Content-Type'] = 'multipart/form-data'
        }
        if (config.method == 'get') config.url = config.url + '?t=' + new Date().getTime()
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    //响应拦截
    instance.interceptors.response.use(
      (res) => {
        //返回数据
        const { data } = res
        // 登录失效
        if (data.code == 401) {
          showToast(i18n.global.t('error401'))
          router.push('/login')
          // location.reload()
          return
        }

        // 业务code
        if (data.code != 200) {
          if (data.code == 600001) showToast(i18n.global.t('error600001'))
          if (data.code == 600002) showToast(i18n.global.t('error600002'))
          if (data.code == 600003) showToast(i18n.global.t('error600003'))
          if (data.code == 600004) showToast(i18n.global.t('error600004'))
          if (data.code == 600005) showToast(i18n.global.t('error600005'))
          if (data.code == 600006) showToast(i18n.global.t('error600006'))
          if (data.code == 600007) showToast(i18n.global.t('error600007'))
          if (data.code == 600008) showToast(i18n.global.t('error600008'))
          if (data.code == 600009) showToast(i18n.global.t('error600009'))
          if (data.code == 600010) showToast(i18n.global.t('error600010'))
          if (data.code == 600011) showToast(i18n.global.t('error600011'))
          if (data.code == 600012) showToast(i18n.global.t('error600012'))
          if (data.code == 600013) showToast(i18n.global.t('error600013'))
          if (data.code == 600014) showToast(i18n.global.t('error600014'))
          if (data.code == 600015) showToast(i18n.global.t('error600015'))
          if (data.code == 600016) showToast(i18n.global.t('error600016'))
          if (data.code == 600017) showToast(i18n.global.t('error600017'))
          if (data.code == 600018) showToast(i18n.global.t('error600018'))
          if (data.code == 600019) showToast(i18n.global.t('error600019'))
          if (data.code == 600020) showToast(i18n.global.t('error600020'))
          if (data.code == 600021) showToast(i18n.global.t('error600021'))
          if (data.code == 600022) showToast(i18n.global.t('error600022'))
          if (data.code == 600024) showToast(i18n.global.t('error600024'))
          if (data.code == 600025) showToast(i18n.global.t('error600025'))
          if (data.code == 600026) showToast(i18n.global.t('error600026'))
          if (data.code == 600027) showToast(i18n.global.t('error600027'))
          if (data.code == 600028) showToast(i18n.global.t('error600028'))
          if (data.code == 600029) showToast(i18n.global.t('error600029'))
          if (data.code == 600030) showToast(i18n.global.t('error600030'))
          if (data.code == 600031) showToast(i18n.global.t('error600031'))
          if (data.code == 600032) showToast(i18n.global.t('error600032'))
          if (data.code == 600033) showToast(i18n.global.t('error600033'))
          if (data.code == 600034) showToast(i18n.global.t('error600034'))
          if (data.code == 600035) showToast(i18n.global.t('error600035'))
          if (data.code == 600036) showToast(i18n.global.t('error600036'))
          if (data.code == 600037) showToast(i18n.global.t('error600037'))
          if (data.code == 600038) showToast(i18n.global.t('error600038'))
          if (data.code == 600039) showToast(i18n.global.t('error600039'))
          if (data.code == 600040) showToast(i18n.global.t('error600040'))
          if (data.code == 600041) showToast(i18n.global.t('error600041'))
          if (data.code == 600042) showToast(i18n.global.t('error600042'))
          if (data.code == 600043) showToast(i18n.global.t('error600043'))
          if (data.code == 600044) showToast(i18n.global.t('error600044'))
          if (data.code == 600045) showToast(i18n.global.t('error600045'))
          if (data.code == 600046) showToast(i18n.global.t('error600046'))
          if (data.code == 600047) showToast(i18n.global.t('error600047'))
          if (data.code == 600048) showToast(i18n.global.t('error600048'))
          if (data.code == 600049) showToast(i18n.global.t('error600049'))
          if (data.code == 600050) showToast(i18n.global.t('error600050'))
          if (data.code == 600051) showToast(i18n.global.t('error600051'))
          if (data.code == 600052) showToast(i18n.global.t('error600052'))
          if (data.code == 600053) showToast(i18n.global.t('error600053'))
          if (data.code == 600054) showToast(i18n.global.t('error600054'))
          if (data.code == 600055) showToast(i18n.global.t('error600055'))
          if (data.code == 600056) showToast(i18n.global.t('error600056'))
          if (data.code == 600057) showToast(i18n.global.t('error600057'))
          if (data.code == 600058) showToast(i18n.global.t('error600058'))
          if (data.code == 600059) showToast(i18n.global.t('error600059'))
          if (data.code == 5000000) showToast(i18n.global.t('error5000000'))
          if (data.code == 5000031) showToast(i18n.global.t('error5000031'))
          if (data.code == 5000032) showToast(i18n.global.t('error5000032'))
          if (data.code == 5000033) showToast(i18n.global.t('error5000033'))
          if (data.code == 5000005) showToast(i18n.global.t('error5000005'))
          if (data.code == 5000036) showToast(i18n.global.t('error5000036'))
        }
        return data
      },
      (error: any) => {
        if (error.statusCode == 404) {
          // 404页面
          // router.push("/404")
        } else {
          // 其他异常，抛提示信息
          showToast(error.message || 'Error')
        }
        return Promise.reject(error)
      }
    )
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const http = new HttpRequest()
export default http
