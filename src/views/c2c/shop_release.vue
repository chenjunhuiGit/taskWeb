<template>
  <div class="c2cShop">
    <div class="tab">
      <div class="item" @click="tabClick(1)">
        <div :class="orderType == 1 ? 'p cur' : 'p'">{{ $t('c2c.d91') }}</div>
      </div>
      <div class="item" @click="tabClick(0)">
        <div :class="orderType == 0 ? 'p cur' : 'p'">{{ $t('c2c.d92') }}</div>
      </div>
    </div>
    <div class="pubBg info">
      <div class="tit" v-if="orderType == 1">{{ $t('c2c.d93') }}</div>
      <div class="tit" v-if="orderType == 0">{{ $t('c2c.d94') }}</div>
      <div class="br">
        <div class="label" v-if="orderType == 1">{{ $t('c2c.d95') }}：</div>
        <div class="label" v-if="orderType == 0">{{ $t('c2c.d96') }}：</div>
        <div class="span">{{ orderInfo.paymentLabel }}</div>
        <template v-if="JSON.stringify(payList) === '{}'">
          <router-link class="blue" to="/userCenter">{{ $t('c2c.d97') }}</router-link>
        </template>
        <template v-else>
          <div class="blue" v-if="orderInfo.status != 0" @click="showPay = true">{{ $t('home.pleasechoose') }}</div>
        </template>
      </div>
      <div class="br">
        <div class="label">{{ $t('c2c.d98') }}：</div>
        <div class="span">{{ orderInfo.realName }}</div>
      </div>
    </div>
    <div class="pubBg info2">
      <div class="tit">
        <div class="label" v-if="orderType == 1">{{ $t('c2c.d99') }}</div>
        <div class="label" v-if="orderType == 0">{{ $t('c2c.d100') }}</div>
        <div class="blue" v-if="orderInfo.status != 0" @click="addClick">+ {{ $t('c2c.d101') }}</div>
      </div>
      <div class="br">
        <div class="text">
          <div class="p">{{ orderInfo.waitTradeAmount || 0 }} USDT</div>
          <div class="span" v-if="orderType == 1">{{ $t('c2c.d102') }}</div>
          <div class="span" v-if="orderType == 0">{{ $t('c2c.d103') }}</div>
        </div>
        <div class="text">
          <div class="p">{{ orderInfo.tradeAmount || 0 }} USDT</div>
          <div class="span" v-if="orderType == 1">{{ $t('c2c.d104') }}</div>
          <div class="span" v-if="orderType == 0">{{ $t('c2c.d105') }}</div>
        </div>
        <div class="text">
          <div class="p">{{ orderInfo.undTradeAmount || 0 }} USDT</div>
          <div class="span">{{ $t('c2c.d85') }}</div>
        </div>
      </div>
      <div class="content" v-if="orderInfo.status == 0">
        <div class="br2 mt">
          <div class="lalel">{{ $t('c2c.d106') }}：</div>
          <div class="span">{{ orderInfo.updateTime }}</div>
        </div>
        <div class="br2">
          <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d107') }}：</div>
          <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d108') }}：</div>
          <div class="span">{{ orderInfo.waitTradeAmount }} USDT</div>
        </div>
        <div class="br2">
          <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d109') }}：</div>
          <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d110') }}：</div>
          <div class="blue" v-if="convertRate">{{ orderInfo.paymentAmount }} {{ convertRate[0].label }}</div>
        </div>
        <div class="br2">
          <div class="lalel">{{ $t('c2c.d111') }}：</div>
          <div class="span">{{ orderInfo.paymentLabel }}</div>
        </div>
        <div class="btn dis">{{ $t('c2c.d112') }}</div>
        <div class="min">
          <div class="pubBtn2" v-if="orderInfo.matchStatus == 0" @click="addCancel">{{ $t('c2c.d113') }}</div>
          <div class="pubBtn2 disabled" v-else>{{ $t('c2c.d113') }}</div>
        </div>
      </div>
      <div class="empty" v-else>{{ $t('page.Nodata') }}</div>
    </div>

    <van-popup v-model:show="showPay" :style="{ height: '53%' }" round position="bottom">
      <div class="popupList">
        <div class="tit">{{ $t('c2c.d37') }}</div>
        <div class="list">
          <div :class="item.checked ? 'item cur' : 'item'" v-for="item in payList" @click="payTypeClick(item)">
            <div class="text">
              {{ item.label }}
              <div class="br" v-if="item.accountName">{{ item.accountName }}</div>
              <div class="br" v-if="item.account">{{ item.account }}</div>
            </div>
            <van-icon name="checked" />
          </div>
        </div>
        <div class="btn" @click="payOk">
          <span>{{ $t('password.Sure') }}</span>
        </div>
      </div>
    </van-popup>

    <van-dialog v-model:show="showAdd" :title="orderType == 1 ? $t('c2c.d121') : $t('c2c.d122')" :show-confirm-button="false">
      <div class="c2cForm">
        <van-icon class="close" name="cross" @click="closeAdd" />
        <div class="item">
          <div class="label" v-if="orderType == 1">{{ $t('c2c.d22') }}</div>
          <div class="label" v-else>{{ $t('c2c.d23') }}</div>
          <div class="right">
            <input type="text" v-model="amount" @input="paymentInput" :placeholder="$t('personal.Pleaseenter')" />
            <div class="all" v-if="orderType == 0" @click="sellAll">{{ $t('c2c.d24') }}</div>
            <span>USDT</span>
          </div>
        </div>
        <div class="br2 mt" v-if="orderType == 1">{{ $t('c2c.d123') }}</div>
        <div class="br2 mt" v-if="orderType == 0">
          {{ $t('c2c.d25') }} <span>{{ userAmount }} USDT</span>，{{ $t('c2c.d26') }}
        </div>
        <div class="item">
          <div class="label" v-if="orderType == 1">{{ $t('c2c.d109') }}</div>
          <div class="label" v-if="orderType == 0">{{ $t('c2c.d110') }}</div>
          <div class="blue" v-if="convertRate">{{ paymentAmount }} {{ convertRate[0].label }}</div>
        </div>
        <div class="br2 mt" v-if="convertRate">
          {{ $t('c2c.d29') }}：<span>1USDT≈{{ convertRate[0].value }} {{ convertRate[0].label }}</span>
        </div>
        <div class="br2">{{ $t('c2c.d30') }}</div>
        <div class="btnBox">
          <div class="btn" @click="addSubmit">{{ $t('c2c.d124') }}</div>
        </div>
      </div>
    </van-dialog>

    <van-dialog v-model:show="showShensu" :title="$t('c2c.d53')" :show-confirm-button="false">
      <div class="c2cForm">
        <van-icon class="close" name="cross" @click="showShensu = false" />
        <div class="item">
          <div class="label">{{ $t('c2c.d59') }}</div>
          <div class="right">
            <input type="text" v-model="cause" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('c2c.d60') }}</div>
          <div class="span">{{ $t('c2c.d61') }}</div>
        </div>
        <div class="item">
          <van-uploader v-model="fileList" max-count="3" :after-read="afterRead" />
        </div>
        <div class="btnBox">
          <div class="btn" @click="shensuSubmit">{{ $t('c2c.d19') }}</div>
        </div>
      </div>
    </van-dialog>

    <!-- 申诉详情 -->
    <van-dialog v-model:show="showAppeal" :title="$t('c2c.d134')" :show-confirm-button="false">
      <div class="c2cFormHeight">
        <div class="c2cForm" v-if="appealInfo.tackleMassage">
          <div class="item">
            <div class="label">{{ $t('c2c.d138') }}</div>
            <div class="span">{{ appealInfo.tackleMassage }}</div>
          </div>
        </div>
        <div class="c2cForm" v-if="appealInfo.buyerCause">
          <van-icon class="close" name="cross" @click="showAppeal = false" />
          <div class="tit" v-if="orderType == 1">{{ $t('c2c.d135') }}</div>
          <div class="tit" v-if="orderType == 0">{{ $t('c2c.d136') }}</div>
          <div class="item">
            <div class="label">{{ $t('c2c.d59') }}</div>
            <div class="span">{{ appealInfo.buyerCause }}</div>
          </div>
          <div class="item">
            <div class="label">{{ $t('c2c.d60') }}</div>
            <div class="span">{{ $t('c2c.d61') }}</div>
          </div>
          <div class="item">
            <van-uploader v-model="appealInfo.buyFileList" multiple max-count="3" :disabled="true" :deletable="false" />
          </div>
        </div>
        <div class="c2cForm" v-if="appealInfo.sellerCause">
          <van-icon class="close" name="cross" @click="showAppeal = false" />
          <div class="tit" v-if="orderType == 0">{{ $t('c2c.d135') }}</div>
          <div class="tit" v-if="orderType == 1">{{ $t('c2c.d136') }}</div>
          <div class="item">
            <div class="label">{{ $t('c2c.d59') }}</div>
            <div class="span">{{ appealInfo.sellerCause }}</div>
          </div>
          <div class="item">
            <div class="label">{{ $t('c2c.d60') }}</div>
            <div class="span">{{ $t('c2c.d61') }}</div>
          </div>
          <div class="item">
            <van-uploader v-model="appealInfo.sellFileList" multiple max-count="3" :disabled="true" :deletable="false" />
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onUnmounted } from 'vue'
import i18n from '@/i18n/index'
import { isRequired } from '@/utils/validators'
import { clipboard, Countdown } from '@/utils/common'
import { showConfirmDialog, showToast } from 'vant'
import router from '@/router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'c2c_shop_release'
})

// 复制
const copy = (key: any) => {
  clipboard(key) ? showToast(i18n.global.t('home.Copiedsuccessfully')) : showToast(i18n.global.t('home.Copyfailed'))
}

// 将秒数格式化为 hh:mm:ss
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = secs.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

const showPay = ref<boolean>(false)
const showAdd = ref<boolean>(false)
const isMatch = ref<boolean>(false)
const orderInfo = ref<any>({})
const orderInfo2 = ref<any>({})
const showAppeal = ref<boolean>(false)
const appealInfo = ref<any>({})
const orderType = ref<number>(1) // 0出售，1购入
const payList = ref<any>([])
const paymentType = ref<any>([])
const convertRate = ref<any>()
const amount = ref<any>('')
const paymentAmount = ref<number>(0)
const userAmount = ref<any>(null)
const cause = ref<string>('')
const showShensu = ref<boolean>(false)
const isSellAppeal = ref<boolean>(false) // 卖方是否申诉
const isBuyAppeal = ref<boolean>(false) // 买方是否申诉

// 获取交易中的订单
let isFor = false // 是否在轮询
let timer2: any = null
const getMatch = () => {
  if (timer2) clearTimeout(timer2)
  proxy.$api.tradingList({ type: orderType.value, source: 1 }).then((res: any) => {
    if (res.code !== 200) return
    if (res.data.length > 0) {
      // 存在交易中的订单
      isMatch.value = true
      orderInfo2.value = res.data
      // isPay.value = orderInfo2.value.paymentStatus == 0
      // isShensu.value = orderInfo2.value.status == 4
      // isSellAppeal.value = orderInfo2.value.sellAppealStatus == 1
      // isBuyAppeal.value = orderInfo2.value.buyAppealStatus == 1

      for (let i = 0; i < orderInfo2.value.length; i++) {
        // 格式化倒计时
        if (orderInfo2.value[i].remainingTime >= 0) {
          orderInfo2.value[i].remainingTime2 = formatTime(orderInfo2.value[i].remainingTime)
        }

        // 交易凭证
        if (orderInfo2.value[i].images) {
          let images = JSON.parse(orderInfo2.value[i].images)
          orderInfo2.value[i].images2 = []
          for (let i2 = 0; i2 < images.length; i2++) {
            orderInfo2.value[i].images2.push({ url: images[i2] })
          }
        }

        // 匹配支付类型展示文案
        orderInfo2.value[i].paymentLabel = orderInfo2.value[i].paymentType
          .map((num: any) => payList.value.find((item: any) => item.value == num.toString()))
          .filter((item: any) => item) // 过滤掉未找到的项
          .map((item: any) => item.label) // 提取 label
          .join('/')
      }

      timer2 = setTimeout(() => {
        isFor = true
        getMatch()
      }, 1000)
    } else {
      isMatch.value = false
      // 不存在交易中的订单,停止轮询
      if (isFor) {
        isFor = false
        init()
      }
    }
  })
}

// 获取发布的交易信息
let timer: any = null
const tradeInfo = () => {
  if (timer) clearTimeout(timer)
  proxy.$api.tradeInfo(orderType.value).then((res: any) => {
    if (res.code !== 200) return
    orderInfo.value = res.data
    orderInfo.value.paymentAmount = orderInfo.value.waitTradeAmount * parseFloat(convertRate.value[0].value)
    if (orderInfo.value.paymentType) {
      paymentType.value = orderInfo.value.paymentType
      // 匹配支付类型展示文案
      orderInfo.value.paymentLabel = orderInfo.value.paymentType
        .map((num: any) => payList.value.find((item: any) => item.value == num.toString()))
        .filter((item: any) => item) // 过滤掉未找到的项
        .map((item: any) => item.label) // 提取 label
        .join('/')
    } else {
      paymentType.value = []
    }

    if (orderInfo.value.status == 0) {
      // 上架了订单,轮询刷新状态
      timer = setTimeout(() => {
        tradeInfo()
      }, 3000)
    }

    // if (orderInfo.value.waitTradeAmount > 0 && orderInfo.value.matchStatus == 0) {
    //   // 上架的订单未匹配成功
    //   timer = setTimeout(() => {
    //     tradeInfo()
    //   }, 3000)
    // }
    // if (orderInfo.value.matchStatus == 1) {
    //   // 上架的订单匹配成功
    //   getMatch()
    // }
  })
}

// 初始化数据
const init = () => {
  orderInfo.value = {}

  // 获取商家申请状态, null未申请、0申请中、1通过、2驳回
  proxy.$api.applyStatus().then((res: any) => {
    if (res.code !== 200) return
    if (res.data.status != 1) {
      showToast(i18n.global.t('c2c.d2'))
      router.go(-1)
    }
  })

  if (orderType.value == 1) {
    // 获取所有支付方式
    proxy.$api.walletPayTypes().then((res: any) => {
      if (res.code !== 200) return
      payList.value = res.data
      tradeInfo()
    })
  }
  if (orderType.value == 0) {
    // 获取个人已设置的支付方式
    proxy.$api.tradeAccountList().then((res: any) => {
      if (res.code !== 200) return
      payList.value = res.data
      if (res.data.length > 0) {
        for (let i = 0; i < payList.value.length; i++) {
          payList.value[i].value = payList.value[i].type
        }
      }
      tradeInfo()
    })
  }

  // 汇率
  if (orderType.value == 1) {
    proxy.$api.walletConvertRate('biz_buy_wallet_rate').then((res: any) => {
      if (res.code !== 200) return
      convertRate.value = res.data
    })
  }
  if (orderType.value == 0) {
    proxy.$api.walletConvertRate('biz_sell_wallet_rate').then((res: any) => {
      if (res.code !== 200) return
      convertRate.value = res.data
    })
  }
  // getMatch()
}
init()

// 出售全部
const sellAll = () => {
  amount.value = parseInt(userAmount.value)
  paymentAmount.value = amount.value * parseFloat(convertRate.value[0].value)
}

// 获取申诉信息
const shenSuInfo = (id: any) => {
  showAppeal.value = true
  appealInfo.value = {}
  proxy.$api.appealDetails(id).then((res: any) => {
    if (res.code !== 200) return
    appealInfo.value = res.data
    if (appealInfo.value.buyerCause) {
      appealInfo.value.buyerImages = JSON.parse(appealInfo.value.buyerImages)
      appealInfo.value.buyFileList = []
      for (let i = 0; i < appealInfo.value.buyerImages.length; i++) {
        appealInfo.value.buyFileList.push({ url: appealInfo.value.buyerImages[i] })
      }
    }
    if (appealInfo.value.sellerCause) {
      appealInfo.value.sellerImages = JSON.parse(appealInfo.value.sellerImages)
      appealInfo.value.sellFileList = []
      for (let i = 0; i < appealInfo.value.sellerImages.length; i++) {
        appealInfo.value.sellFileList.push({ url: appealInfo.value.sellerImages[i] })
      }
    }
  })
}

// 确认付款
const iPay = (id: any) => {
  showConfirmDialog({
    title: i18n.global.t('c2c.d71'),
    message: i18n.global.t('c2c.d72')
  }).then(() => {
    proxy.$api.orderConfirmPayment({ orderId: id }).then((res: any) => {
      if (res.code !== 200) return
      init()
    })
  })
}

// 确认收款
const confirmPay = (id: any) => {
  showConfirmDialog({
    message: i18n.global.t('c2c.d67')
  }).then(() => {
    proxy.$api.confirmReceivePayment(id).then((res: any) => {
      if (res.code == 600044) {
        // 订单申诉中
        init()
      }
      if (res.code !== 200) return
      showToast(i18n.global.t('c2c.d126'))
      init()
    })
  })
}

// 买卖切换
const tabClick = (type: number) => {
  orderType.value = type
  init()
}

// 买卖方式选择
const payTypeClick = (item: any) => {
  item.checked = !item.checked
}
const tradeAccountIds = ref<any>([])
const payOk = () => {
  tradeAccountIds.value = []
  paymentType.value = []
  let arr = []
  for (let i = 0; i < payList.value.length; i++) {
    if (payList.value[i].checked) {
      arr.push(payList.value[i].label)
      paymentType.value.push(payList.value[i].value)
      if (payList.value[i].id) tradeAccountIds.value.push(payList.value[i].id)
    }
  }
  orderInfo.value.paymentLabel = arr.join('/')
  showPay.value = false
}

const paymentInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  // 如果输入值小于等于0，则将其清空或设为1（根据需求调整）
  if (!/^\d*\.?\d*$/.test(value) || parseFloat(value) <= 0) {
    amount.value = ''
  } else {
    amount.value = parseInt(value) || ''
    paymentAmount.value = amount.value * parseFloat(convertRate.value[0].value)
  }
}

// 添加
const noPay = ref(false)
proxy.$api.tradeAccountList().then((res: any) => {
  if (res.code !== 200) return
  if (res.data.length <= 0) noPay.value = true
})
const addClick = () => {
  if (noPay.value) {
    showToast(i18n.global.t('c2c.d133'))
    return
  }

  showAdd.value = true
  if (orderType.value == 0) {
    proxy.$api.walletInfo().then((res: any) => {
      if (res.code !== 200) return
      userAmount.value = res.data.amount
    })
  }
}

// 发布
const addSubmit = () => {
  if (!isRequired(amount.value)) {
    showToast('c2c.d73')
    return
  }
  if (parseFloat(amount.value) < 5) {
    showToast(i18n.global.t('c2c.d131'))
    return
  }
  if (paymentType.value.length <= 0) {
    if (orderType.value == 1) showToast(i18n.global.t('c2c.d74'))
    if (orderType.value == 0) showToast(i18n.global.t('c2c.d127'))
    return
  }
  if (orderType.value == 0 && amount.value > userAmount.value) {
    showToast(i18n.global.t('error600016'))
    return
  }
  proxy.$api
    .tradeInfoRelease({
      tradeAccountIds: tradeAccountIds.value,
      amount: amount.value,
      type: orderType.value,
      paymentType: paymentType.value,
      paymentAmount: paymentAmount.value
    })
    .then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('c2c.d128'))
      showAdd.value = false
      init()
    })
}

// 下架
const addCancel = () => {
  showConfirmDialog({
    message: i18n.global.t('c2c.d129')
  }).then(() => {
    if (timer) clearTimeout(timer)
    proxy.$api.tradeInfoRemoved(orderInfo.value.id).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('c2c.d130'))
      init()
    })
  })
}

// 取消订单
const orderCancel = (id: any) => {
  showConfirmDialog({
    message: i18n.global.t('c2c.d52') + '?'
  }).then(() => {
    proxy.$api.orderCancelled(id).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('c2c.d62'))
      init()
    })
  })
}

// 关闭添加弹窗
const closeAdd = () => {
  showAdd.value = false
  amount.value = ''
  paymentAmount.value = 0
}

// 图片上传
const fileList = ref<any>([])
const afterRead = (file: any) => {
  file.status = 'uploading'
  proxy.$api.imgUpload({ type: 2, file: file.file }).then((res: any) => {
    if (res.code !== 200) {
      file.status = 'failed'
      return
    }
    file.url = res.data
    file.status = 'done'
  })
}

// 点击申诉按钮
const curIndex = ref<any>(null)
const shensuClick = (index: any) => {
  curIndex.value = index
  showShensu.value = true
  cause.value = ''
  fileList.value = []
}

// 提交申诉
const shensuSubmit = () => {
  if (!isRequired(cause.value)) {
    showToast(i18n.global.t('c2c.d68'))
    return
  }
  let json = {
    source: 1,
    paymentAmount: orderInfo2.value[curIndex.value].paymentAmount,
    tradeType: orderInfo2.value[curIndex.value].tradeType,
    orderId: orderInfo2.value[curIndex.value].id,
    cause: cause.value,
    images: []
  }
  for (let i = 0; i < fileList.value.length; i++) {
    if (fileList.value[i].url) json.images[i] = fileList.value[i].url
  }
  if (fileList.value.length <= 0 || json.images.length <= 0) {
    showToast(i18n.global.t('c2c.d69'))
    return
  }
  proxy.$api.appealCreate(json).then((res: any) => {
    if (res.code !== 200) return
    showToast(i18n.global.t('c2c.d70'))
    orderType.value == 0 ? (isSellAppeal.value = true) : (isBuyAppeal.value = true)
    showShensu.value = false
  })
}

const isMore = ref<boolean>(true)
const more = () => {
  if (isMore.value) {
    // finishPage.pageNum++
    // taskPage(finishPage)
  }
}

// 离开页面清除倒计时
onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (timer2) clearInterval(timer2)
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
