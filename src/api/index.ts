import { App } from 'vue'
import http from '@/utils/request'

const Api = {
  sendCode(email: string) {
    return http.request({
      url: '/biz/captcha/send/' + email,
      method: 'post'
    })
  },
  signUp(data: any) {
    return http.request({
      url: '/biz/account/v2/signUp',
      method: 'post',
      data
    })
  },
  signIn(data: any) {
    return http.request({
      url: '/biz/account/v2/signIn',
      method: 'post',
      data
    })
  },
  signIn2(data: any) {
    return http.request({
      url: '/biz/account/signIn',
      method: 'post',
      data
    })
  },
  signOut(data: any) {
    return http.request({
      url: '/biz/account/signOut',
      method: 'post',
      data
    })
  },
  passwordUpdate(data: any) {
    return http.request({
      url: '/biz/user/password/update',
      method: 'post',
      data
    })
  },
  payPassword(data: any) {
    return http.request({
      url: '/biz/wallet/payPassword',
      method: 'post',
      data
    })
  },
  userInfo(params: any) {
    return http.request({
      url: '/biz/user/info',
      method: 'get',
      params
    })
  },
  profileUpdate(data: any) {
    return http.request({
      url: '/biz/user/profile/update',
      method: 'post',
      data
    })
  },
  walletInfo(params: any) {
    return http.request({
      url: '/biz/wallet/info',
      method: 'get',
      params
    })
  },
  walletInfo2(params: any) {
    return http.request({
      url: '/biz/wallet/info2',
      method: 'get',
      params
    })
  },
  walletTransfer(data: any) {
    return http.request({
      url: '/biz/wallet/transfer',
      method: 'post',
      data
    })
  },
  quaInspection(data: any) {
    return http.request({
      url: '/biz/wallet/quaInspection',
      method: 'post',
      data
    })
  },
  walletRecord(data: any) {
    return http.request({
      url: '/biz/wallet/record',
      method: 'post',
      data
    })
  },
  addressUpdate(data: any) {
    return http.request({
      url: '/biz/wallet/address/update',
      method: 'post',
      data
    })
  },
  articleList(params: any) {
    return http.request({
      url: '/biz/article/list',
      method: 'get',
      params
    })
  },
  imageJumpList(params: any) {
    return http.request({
      url: '/biz/imageJump/list',
      method: 'get',
      params
    })
  },
  taskTypeList(params: any) {
    return http.request({
      url: '/biz/task/type/list',
      method: 'get',
      params
    })
  },
  taskLevel(type: string) {
    return http.request({
      url: '/biz/task/level/list/' + type,
      method: 'get'
    })
  },
  varGet(key: string) {
    return http.request({
      url: '/biz/var/get/' + key,
      method: 'get'
    })
  },
  taskText(data: any) {
    return http.request({
      url: '/biz/task/typeText/getById',
      method: 'post',
      data
    })
  },
  taskOpen(data: any) {
    return http.request({
      url: '/biz/task/open',
      method: 'post',
      data
    })
  },
  taskPage(data: any) {
    return http.request({
      url: '/biz/task/page',
      method: 'post',
      data
    })
  },
  walletIncome(params: any) {
    return http.request({
      url: '/biz/wallet/income/stat',
      method: 'get',
      params
    })
  },
  nextGuideTask(data: any) {
    return http.request({
      url: '/biz/user/nextGuideTask',
      method: 'post',
      data
    })
  },
  passGuide(data: any) {
    return http.request({
      url: '/biz/user/passGuide',
      method: 'post',
      data
    })
  },
  withdraw(data: any) {
    return http.request({
      url: '/biz/wallet/draw',
      method: 'post',
      data
    })
  },
  taskNext(taskId: number) {
    return http.request({
      url: '/biz/task/content/' + taskId + '/next',
      method: 'post'
    })
  },
  getCurTaskNext(taskId: number) {
    return http.request({
      url: `/biz/task/content/${taskId}/current`,
      method: 'get'
    })
  },
  taskSubmit(data: any) {
    return http.request({
      url: '/biz/task/content/submit',
      method: 'post',
      data
    })
  },
  childUser(data: any) {
    return http.request({
      url: '/biz/user/childUser',
      method: 'post',
      data
    })
  },
  walletTopUp(data: any) {
    return http.request({
      url: '/biz/wallet/top_up',
      method: 'post',
      data
    })
  },
  imgUpload(data: any) {
    return http.request({
      url: '/storage/img/upload',
      method: 'post',
      data
    })
  },
  authSubmit(data: any) {
    return http.request({
      url: '/biz/user/auth/submit',
      method: 'post',
      data
    })
  },
  emailBind(data: any) {
    return http.request({
      url: '/biz/user/email/bind',
      method: 'post',
      data
    })
  },
  applyCreate(data: any) {
    return http.request({
      url: '/biz/c2c/merchant/apply/create',
      method: 'post',
      data
    })
  },
  applyStatus() {
    return http.request({
      url: `/biz/c2c/merchant/apply/status`,
      method: 'get'
    })
  },
  tradingList(data: any) {
    return http.request({
      url: `/biz/c2c/order/trading/get`,
      method: 'post',
      data
    })
  },
  walletPayTypes() {
    return http.request({
      url: `/biz/wallet/payTypes`,
      method: 'get'
    })
  },
  walletConvertRate(type: any) {
    return http.request({
      url: `/biz/wallet/convertRate/${type}`,
      method: 'get'
    })
  },
  tradeMatch(data: any) {
    return http.request({
      url: '/biz/c2c/trade/match',
      method: 'post',
      data
    })
  },
  orderCancelled(data: any) {
    return http.request({
      url: `/biz/c2c/order/cancelled`,
      method: 'post',
      data
    })
  },
  orderConfirmPayment(data: any) {
    return http.request({
      url: `/biz/c2c/order/confirmPayment`,
      method: 'post',
      data
    })
  },
  appealCreate(data: any) {
    return http.request({
      url: `/biz/c2c/appeal/create`,
      method: 'post',
      data
    })
  },
  appealDetails(orderId: any) {
    return http.request({
      url: `/biz/c2c/appeal/details/${orderId}`,
      method: 'get'
    })
  },
  monthlyOverview() {
    return http.request({
      url: `/biz/c2c/monthly/overview`,
      method: 'get'
    })
  },
  monthRewards(data: any) {
    return http.request({
      url: `/biz/c2c/list/month/rewards`,
      method: 'post',
      data
    })
  },
  claimMonth(data: any) {
    return http.request({
      url: `/biz/c2c/claim/month/rewards`,
      method: 'post',
      data
    })
  },
  accountAdd(data: any) {
    return http.request({
      url: `/biz/user/trade/account/add`,
      method: 'post',
      data
    })
  },
  tradeAccount(data: any) {
    return http.request({
      url: `/biz/user/trade/account`,
      method: 'post',
      data
    })
  },
  confirmReceivePayment(orderId: any) {
    return http.request({
      url: `/biz/c2c/order/confirmReceivePayment/${orderId}`,
      method: 'post'
    })
  },
  matchRecord(type: any) {
    return http.request({
      url: `/biz/c2c/match/record/list/${type}`,
      method: 'get'
    })
  },
  tradeInfo(type: any) {
    return http.request({
      url: `/biz/c2c/trade/info/${type}`,
      method: 'get'
    })
  },
  orderList(data: any) {
    return http.request({
      url: `/biz/c2c/order/list`,
      method: 'post',
      data
    })
  },
  tradeInfoRelease(data: any) {
    return http.request({
      url: `/biz/c2c/trade/info/release`,
      method: 'post',
      data
    })
  },
  tradeInfoRemoved(tradeId: any) {
    return http.request({
      url: `/biz/c2c/trade/info/removed/${tradeId}`,
      method: 'post'
    })
  },
  tradeAccountList() {
    return http.request({
      url: `/biz/user/trade/account/list`,
      method: 'get'
    })
  },
  tradeAccountModify(data: any) {
    return http.request({
      url: `/biz/user/trade/account/modify`,
      method: 'post',
      data
    })
  },
  accountRemove(data: any) {
    return http.request({
      url: `/biz/user/trade/account/remove`,
      method: 'post',
      data
    })
  },
  authRecord() {
    return http.request({
      url: `/biz/user/auth/authRecord`,
      method: 'get'
    })
  },
  UserRelease(data: any) {
    return http.request({
      url: `/biz/c2c/trade/info/UserRelease`,
      method: 'post',
      data
    })
  },
  getUserRelease() {
    return http.request({
      url: `/biz/c2c/trade/info/getUserRelease`,
      method: 'get'
    })
  },
  accelerate(id: any) {
    return http.request({
      url: `/biz/c2c/order/accelerate/${id}`,
      method: 'get'
    })
  },
  myteam() {
    return http.request({
      url: `/biz/user/myteam`,
      method: 'get'
    })
  },
  taskAll() {
    return http.request({
      url: `/biz/task/type/all`,
      method: 'get'
    })
  },
  myteamMembers(data: any) {
    return http.request({
      url: `/biz/user/myteam/members`,
      method: 'post',
      data
    })
  },
  getUserInfoSteep() {
    //获取用户的所有等级进度条
    return http.request({
      url: `/biz/user/level/get`,
      method: 'get'
    })
  },
  getUserLevelInfo() {
    //获取当前用户职位等信息
    return http.request({
      url: `/biz/user/level/userLevelInfo`,
      method: 'get'
    })
  },
  getUserGetMonthly() {
    //申请领取月薪 查看下次领取日期
    return http.request({
      url: `/biz/user/level/apply/monthly`,
      method: 'get'
    })
  },
  getLevel(id: any) {
    return http.request({
      url: `/biz/user/level/getLevel/${id}`,
      method: 'get'
    })
  },
  updateAvatar(data: any) {
    return http.request({
      url: `/biz/user/avatar/update`,
      method: 'post',
      data
    })
  },
  getGontractInfo() {
    return http.request({
      url: `/biz/user/contract/info`,
      method: 'get'
    })
  },
  toGontractSign(data: any) {
    return http.request({
      url: `/biz/user/contract/sign`,
      method: 'post',
      data
    })
  },
  toGetShareList(data: any) {
    return http.request({
      url: `/biz/share/list`,
      method: 'post',
      data
    })
  },
  toGetShareListById(data: any) {
    return http.request({
      url: `/biz/share/listById`,
      method: 'post',
      data
    })
  },
  toGetShareGet(id: any) {
    return http.request({
      url: `/biz/share/get/${id}`,
      method: 'get'
    })
  }
}

export const ApiPlugin = {
  install: (app: App) => {
    app.config.globalProperties.$api = Api
  }
}
