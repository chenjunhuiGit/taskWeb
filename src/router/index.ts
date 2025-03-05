import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from '@/plugins/nprogress'
import i18n from '@/i18n/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '首页',
      i18nKey: 'router.Home',
      hasHeader: true
    }
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('../views/task/index.vue'),
    meta: {
      title: '任务',
      i18nKey: 'router.Task',
      hasHeader: true
    }
  },
  {
    path: '/c2c',
    name: 'c2c',
    component: () => import('../views/c2c/index.vue'),
    meta: {
      title: 'P2P',
      hasHeader: true
    }
  },
  {
    path: '/task/working',
    name: 'task_working',
    component: () => import('../views/task/working.vue'),
    meta: {
      title: '工作',
      i18nKey: 'router.Work'
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/personal/index.vue'),
    meta: {
      title: '个人中心',
      i18nKey: 'router.PersonalCenter'
    }
  },
  {
    path: '/personal/password',
    name: 'personal_password',
    component: () => import('../views/personal/password.vue'),
    meta: {
      title: '修改密码',
      i18nKey: 'router.ChangePassword'
    }
  },
  {
    path: '/personal/email',
    name: 'personal_email',
    component: () => import('../views/personal/email.vue'),
    meta: {
      title: '绑定邮箱',
      i18nKey: 'new.d20'
    }
  },
  {
    path: '/personal/withdraw',
    name: 'personal_withdraw',
    component: () => import('../views/personal/withdraw.vue'),
    meta: {
      title: '链上On-Chain出售',
      i18nKey: 'wallet.d4'
    }
  },
  {
    path: '/personal/payCard',
    name: 'personal_payCard',
    component: () => import('../views/personal/payCard.vue'),
    meta: {
      title: '收款方式',
      i18nKey: 'c2c.d46'
    }
  },
  {
    path: '/personal/wallet',
    name: 'personal_wallet',
    component: () => import('../views/personal/wallet.vue'),
    meta: {
      title: '钱包',
      i18nKey: 'router.wallet'
    }
  },
  {
    path: '/personal/wallet_address',
    name: 'personal_wallet_address',
    component: () => import('../views/personal/wallet_address.vue'),
    meta: {
      title: '修改钱包地址',
      i18nKey: 'router.ModifyWalletAddress'
    }
  },
  {
    path: '/personal/assets',
    name: 'personal_assets',
    component: () => import('../views/personal/assets.vue'),
    meta: {
      title: '资金流水',
      i18nKey: 'wallet.d11'
    }
  },
  {
    path: '/personal/children',
    name: 'personal_children',
    component: () => import('../views/personal/children.vue'),
    meta: {
      title: '我的团队',
      i18nKey: 'router.MarketingRebate'
    }
  },
  {
    path: '/personal/teams',
    name: 'personal_teams',
    component: () => import('../views/personal/teams.vue'),
    meta: {
      title: '团队成员',
      i18nKey: 'router.teams'
    }
  },
  {
    path: '/personal/customer',
    name: 'personal_customer',
    component: () => import('../views/personal/customer.vue'),
    meta: {
      title: '联系客服',
      i18nKey: 'router.customer'
    }
  },
  {
    path: '/personal/identity',
    name: 'personal_identity',
    component: () => import('../views/personal/identity.vue'),
    meta: {
      title: '身份认证',
      i18nKey: 'router.identity'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '登录',
      i18nKey: 'router.Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue'),
    meta: {
      title: '注册',
      i18nKey: 'router.Register'
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/login/forget.vue'),
    meta: {
      title: '忘记密码',
      i18nKey: 'router.ForgetThePassword'
    }
  },
  {
    path: '/article',
    name: 'article_list',
    component: () => import('../views/article/index.vue'),
    meta: {
      title: '关于我们',
      hasHeader: true,
      i18nKey: 'router.AboutUs'
    }
  },
  {
    path: '/article/info',
    name: 'article_info',
    component: () => import('../views/article/info.vue'),
    meta: {
      title: '详情',
      i18nKey: 'router.Details'
    }
  },
  {
    path: '/c2c/match',
    name: 'c2c_match',
    component: () => import('../views/c2c/match.vue'),
    meta: {
      title: '匹配记录',
      i18nKey: 'router.match'
    }
  },
  {
    path: '/c2c/shop',
    name: 'c2c_shop',
    component: () => import('../views/c2c/shop.vue'),
    meta: {
      title: '交易员中心',
      i18nKey: 'router.shop'
    }
  },
  {
    path: '/c2c/shop_month',
    name: 'c2c_shop_month',
    component: () => import('../views/c2c/shop_month.vue'),
    meta: {
      title: '订单奖励',
      i18nKey: 'router.shop_month'
    }
  },
  {
    path: '/c2c/sell_month',
    name: 'c2c_sell_month',
    component: () => import('../views/c2c/shop_month.vue'),
    meta: {
      title: '销售额奖励',
      i18nKey: 'c2c.d205'
    }
  },
  {
    path: '/c2c/shop_release',
    name: 'c2c_shop_release',
    component: () => import('../views/c2c/shop_release.vue'),
    meta: {
      title: '发布订单',
      i18nKey: 'router.shop_release'
    }
  },
  {
    path: '/c2c/shop_trading',
    name: 'c2c_shop_trading',
    component: () => import('../views/c2c/shop_trading.vue'),
    meta: {
      title: '处理中的订单',
      i18nKey: 'router.shop_trading'
    }
  },
  {
    path: '/c2c/shop_order',
    name: 'c2c_shop_order',
    component: () => import('../views/c2c/shop_order.vue'),
    meta: {
      title: '历史订单',
      i18nKey: 'router.shop_order'
    }
  },
  {
    path: '/position',
    name: 'position',
    component: () => import('../views/position/index.vue'),
    meta: {
      title: '职位等级',
      i18nKey: 'router.Position'
    }
  },
  {
    path: '/userCenter',
    name: 'userCenterIndex',
    component: () => import('../views/userCenter/index.vue'),
    meta: {
      title: '个人中心',
      i18nKey: 'router.userCenter'
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('../views/userCenter/userInfo.vue'),
    meta: {
      title: '个人信息',
      i18nKey: 'router.userInfo'
    }
  },
  {
    path: '/personal/transfer',
    name: 'personal_transfer',
    component: () => import('../views/personal/transfer.vue'),
    meta: {
      title: '内部转账',
      i18nKey: 'new.d33'
    }
  },
  {
    path: '/contract',
    name: 'contract',
    component: () => import('../views/userCenter/contract.vue'),
    meta: {
      title: '合同信息',
      i18nKey: 'router.contract'
    }
  },
  {
    path: '/timeView',
    name: 'timeView',
    component: () => import('../views/timeView/index.vue'),
    meta: {
      title: '时刻',
      i18nKey: 'router.Moment',
      hasHeader:true
    }
  },
  {
    path: '/tiemViewList',
    name: 'tiemViewList',
    component: () => import('../views/timeView/tiemViewList.vue'),
    meta: {
      title: '时刻列表',
      i18nKey: 'router.Moment'
    }
  },
  {
    path: '/timeViewDetail',
    name: 'timeViewDetail',
    component: () => import('../views/timeView/timeViewDetail.vue'),
    meta: {
      title: '时刻详情',
      i18nKey: 'router.Moment'
    }
  },
  {
    path: '/teamCommission',
    name: 'teamCommission',
    component: () => import('../views/personal/teamCommission.vue'),
    meta: {
      title: '佣金记录',
      i18nKey: 'new.d53'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.i18nKey) {
    document.title = i18n.global.t(to.meta.i18nKey as string)
  } else {
    document.title = to.meta.title as string
  }
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
