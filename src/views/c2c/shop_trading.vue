<template>
  <div class="c2cShop">
    <div class="tab">
      <div class="item" @click="tabClick(1)">
        <div :class="orderType == 1 ? 'p cur' : 'p'">{{ $t('c2c.d91') }}({{ list1.length }})</div>
      </div>
      <div class="item" @click="tabClick(0)">
        <div :class="orderType == 0 ? 'p cur' : 'p'">{{ $t('c2c.d92') }}({{ list0.length }})</div>
      </div>
    </div>

    <div class="pubBg info2" v-for="(item, i) in orderList">
      <div class="content">
        <div class="br2 mt">
          <div class="lalel">{{ $t('c2c.d167') }}：</div>
          <div class="lr">
            <div class="span">{{ item.id }}</div>
            <div class="copy" @click="copy(item.id)">{{ $t('home.copy') }}</div>
          </div>
        </div>
        <div class="br2">
          <div class="lalel">{{ $t('c2c.d106') }}：</div>
          <div class="lr">
            <div class="span">{{ item.createTime }}</div>
            <div class="copy" @click="copy(item.createTime)">{{ $t('home.copy') }}</div>
          </div>
        </div>

        <!-- <div class="br2">
          <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d114') }}：</div>
          <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d115') }}：</div>
          <div class="span">{{ item.targetName }}</div>
        </div>
        <div class="br2">
          <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d22') }}：</div>
          <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d23') }}：</div>
          <div class="blue">{{ item.totalAmount }} USDT</div>
        </div> -->
        <div class="br2">
          <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d79') }}：</div>
          <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d80') }}：</div>
          <div class="span" v-if="convertRate">{{ item.paymentAmount }} {{ convertRate[0].label }}</div>
        </div>
        <div class="br2">
          <div class="lalel">{{ $t('c2c.d116') }}：</div>
          <div class="span">{{ item.matchAmount }} USDT</div>
        </div>
        <template v-for="item2 in item.tradeAccounts">
          <div class="br2">
            <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d46') }}：</div>
            <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d111') }}：</div>
            <div class="span">{{ item2.label }}</div>
          </div>
          <div class="br2 mt0">
            <div class="lalel">{{ $t('c2c.d48') }}：</div>
            <div class="lr">
              <div class="span">{{ item2.accountName }}</div>
              <div class="copy" @click="copy(item2.accountName)">{{ $t('home.copy') }}</div>
            </div>
          </div>
          <div class="br2 mt0">
            <div class="lalel">{{ $t('c2c.d47') }}：</div>
            <div class="lr">
              <div class="span">{{ item2.account }}</div>
              <div class="copy" @click="copy(item2.account)">{{ $t('home.copy') }}</div>
            </div>
          </div>
        </template>
        <!-- <div class="br2 flexStart">
          <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d46') }}：</div>
          <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d111') }}：</div>
          <div class="account">
            <div class="acc" v-for="item2 in item.tradeAccounts">
              <div class="span">{{ item2.label }}</div>
              <div class="lr">
                <div class="span">{{ item2.accountName }}</div>
                <div class="copy" @click="copy(item2.accountName)">{{ $t('home.copy') }}</div>
              </div>
              <div class="lr">
                <div class="span">{{ item2.account }}</div>
                <div class="copy" @click="copy(item2.account)">{{ $t('home.copy') }}</div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="br2">
          <div class="lalel">{{ $t('c2c.d83') }}：</div>
          <div class="span">{{ item.message }}</div>
        </div>
        <div class="br2" v-if="item.remainingTime >= 0 && orderType == 0 && item.paymentStatus != 0">
          <div class="label">{{ $t('working.Timeleft') }}：</div>
          <div class="span">{{ item.remainingTime2 }}</div>
        </div>
        <div class="br2">
          <div class="lalel">{{ $t('c2c.d84') }}：</div>
          <div class="lr">
            <div class="span" v-if="item.status == 0">{{ $t('c2c.d85') }}</div>
            <div class="span" v-if="item.status == 1">{{ $t('c2c.d86') }}</div>
            <template v-if="item.status == 2 || item.status == 3">
              <div class="red" v-if="item.appealStatus == 1">{{ $t('c2c.d87') }}</div>
              <div class="span" v-if="item.appealStatus == 0">{{ $t('c2c.d88') }}</div>
            </template>
            <div class="span" v-if="item.status == 4">{{ $t('c2c.d89') }}</div>
            <div class="red" v-if="item.status == 5">{{ $t('c2c.d90') }}</div>
            <div class="pubBtn disabled speed" v-if="item.isAccelerate == 1">{{ $t('c2c.d172') }}</div>
          </div>
        </div>
        <div class="br2">
          <van-uploader v-if="item.paymentStatus != 0 && orderType == 1" v-model="imgObj[item.id]" max-count="3" :after-read="afterRead" />
          <van-uploader v-if="item.images.length > 0" v-model="item.images" multiple max-count="3" :disabled="true" :deletable="false" />
        </div>
        <div class="btnBox" v-if="orderType == 1">
          <div class="btn dis" v-if="item.paymentStatus == 0">{{ $t('c2c.d119') }}</div>
          <div class="btn" v-if="item.paymentStatus != 0 && imgObj[item.id].length > 0" @click="iPay(item)">{{ $t('c2c.d71') }}</div>
          <div class="btn dis" v-if="item.paymentStatus != 0 && imgObj[item.id].length <= 0">{{ $t('c2c.d71') }}</div>
          <div class="btn2" v-if="item.paymentStatus != 0" @click="cancelShow(item.id)">{{ $t('c2c.d58') }}</div>
        </div>
        <div class="btnBox" v-if="orderType == 0">
          <div class="btn dis" v-if="item.paymentStatus != 0">{{ $t('c2c.d120') }}</div>
          <div class="btn" v-if="item.paymentStatus == 0 && item.status != 4" @click="confirmPay(item.id)">{{ $t('c2c.d57') }}</div>
          <div class="btn" v-if="item.paymentStatus == 0 && item.sellAppealStatus != 1" @click="shensuClick(i)">{{ $t('c2c.d53') }}</div>
          <div class="btn" v-if="item.status == 4" @click="shenSuInfo(item.id)">{{ $t('c2c.d54') }}</div>
        </div>
      </div>
    </div>
    <div class="empty" v-if="orderList.length <= 0">{{ $t('page.Nodata') }}</div>
    <!-- <div class="more">{{ $t('page.more') }}</div> -->
    <!-- <div class="more" @click="more" v-if="isMore">{{ $t('page.more') }}</div>
      <div class="empty" @click="more" v-if="finish.length > 0 && !isMore">{{ $t('page.final') }}</div>
      <div class="empty" v-if="finish.length <= 0">{{ $t('page.Nodata') }}</div> -->

    <van-dialog v-model:show="showCancel" :title="$t('c2c.d58')" :show-confirm-button="false">
      <div class="c2cForm">
        <van-icon class="close" name="cross" @click="showCancel = false" />
        <div class="item">
          <div class="label">{{ $t('c2c.d198') }}</div>
          <div class="right">
            <input type="text" v-model="cancelMsg" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="btnBox">
          <div class="btn" @click="orderCancel">{{ $t('c2c.d19') }}</div>
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
import { clipboard } from '@/utils/common'
import { showConfirmDialog, showToast } from 'vant'
import router from '@/router'
import { isRequired } from '@/utils/validators'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'c2c_shop_trading'
})

// 复制
const copy = (key: any) => {
  clipboard(key) ? showToast(i18n.global.t('home.Copiedsuccessfully')) : showToast(i18n.global.t('home.Copyfailed'))
}

const list0 = ref<any>([])
const list1 = ref<any>([])
const orderList = ref<any>([])
const showAppeal = ref<boolean>(false)
const appealInfo = ref<any>({})
const orderType = ref<number>(1) // 0出售，1购入
const payList = ref<any>([])
const convertRate = ref<any>()
const cause = ref<string>('')
const showShensu = ref<boolean>(false)
const isSellAppeal = ref<boolean>(false) // 卖方是否申诉
const isBuyAppeal = ref<boolean>(false) // 买方是否申诉
const imgObj = ref<any>({}) // 买方交易凭证

// 获取订单列表
let timer: any = null
const getList = (type: number) => {
  if (timer) clearTimeout(timer)
  proxy.$api.tradingList({ type: type, source: 1 }).then((res: any) => {
    if (res.code !== 200) return
    let data = res.data.reverse()
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        // 购买时，凭证图片
        if (orderType.value == 1 && !imgObj.value[data[i].id]) {
          imgObj.value[data[i].id] = []
        }

        // 格式化倒计时
        if (data[i].remainingTime >= 0) {
          data[i].remainingTime2 = formatTime(data[i].remainingTime)
        }

        // 匹配支付类型展示文案
        data[i].paymentLabel = data[i].paymentType
          .map((num: any) => payList.value.find((item: any) => item.value == num.toString()))
          .filter((item: any) => item) // 过滤掉未找到的项
          .map((item: any) => item.label) // 提取 label
          .join('/')
        // 交易凭证
        data[i].images = JSON.parse(data[i].images || '[]')
        if (data[i].images.length > 0) {
          let arr = []
          for (let i2 = 0; i2 < data[i].images.length; i2++) {
            arr.push({ url: data[i].images[i2] })
          }
          data[i].images = arr
        }
      }
    }
    if (type == 0) {
      list0.value = data
      orderList.value = list0.value
    }
    if (type == 1) {
      list1.value = data
      orderList.value = list1.value
    }
    timer = setTimeout(() => {
      getList(orderType.value)
    }, 1000)
  })
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

// 初始化数据
const init = () => {
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
    })
  }

  // 获取订单列表
  getList(0)
  getList(1)

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
}
init()

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

// 买卖切换
const tabClick = (type: number) => {
  orderType.value = type
  if (type == 0) orderList.value = list0.value
  if (type == 1) orderList.value = list1.value
}

// 确认付款
const iPay = (item: any) => {
  showConfirmDialog({
    title: i18n.global.t('c2c.d71'),
    message: i18n.global.t('c2c.d72')
  }).then(() => {
    let json = {
      orderId: item.id,
      images: []
    }
    for (let i = 0; i < imgObj.value[item.id].length; i++) {
      if (imgObj.value[item.id][i].url) json.images[i] = imgObj.value[item.id][i].url
    }
    if (imgObj.value[item.id].length <= 0 || json.images.length <= 0) {
      showToast(i18n.global.t('c2c.d69'))
      return
    }
    proxy.$api.orderConfirmPayment(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('c2c.d126'))
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

// 取消订单弹窗
const showCancel = ref<boolean>(false)
const cancelId = ref<any>('')
const cancelMsg = ref<any>('')
const cancelShow = (id: any) => {
  showCancel.value = true
  cancelId.value = id
  cancelMsg.value = ''
}

// 取消订单
const orderCancel = (id: any) => {
  if (!cancelMsg.value) {
    showToast(i18n.global.t('c2c.d199'))
    return
  }
  proxy.$api.orderCancelled({ orderId: cancelId.value, message: cancelMsg.value }).then((res: any) => {
    if (res.code !== 200) return
    showCancel.value = false
    showToast(i18n.global.t('c2c.d62'))
    init()
  })
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
    paymentAmount: orderList.value[curIndex.value].paymentAmount,
    tradeType: orderList.value[curIndex.value].tradeType,
    orderId: orderList.value[curIndex.value].id,
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

// 离开页面清除倒计时
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
