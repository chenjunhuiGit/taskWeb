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
    <div class="search">
      <input type="text" v-model="orderId" :placeholder="$t('c2c.d200')" @input="search" />
      <div class="pubBtn" @click="search">{{ $t('c2c.d201') }}</div>
    </div>

    <div class="pubBg info2" v-for="item in orderList">
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
        <div class="br2">
          <div class="lalel">{{ $t('c2c.d84') }}：</div>
          <div class="span" v-if="item.status == 0">{{ $t('c2c.d85') }}</div>
          <div class="span" v-if="item.status == 1">{{ $t('c2c.d86') }}</div>
          <template v-if="item.status == 2 || item.status == 3">
            <div class="red" v-if="item.appealStatus == 1">{{ $t('c2c.d87') }}</div>
            <div class="span" v-if="item.appealStatus == 0">{{ $t('c2c.d88') }}</div>
          </template>
          <div class="span" v-if="item.status == 4">{{ $t('c2c.d89') }}</div>
          <div class="red" v-if="item.status == 5">{{ $t('c2c.d90') }}</div>
        </div>
        <div class="br2" v-if="item.images.length > 0">
          <van-uploader v-model="item.images" multiple max-count="3" :disabled="true" :deletable="false" />
        </div>
        <div class="btn" v-if="item.status == 2 || item.status == 3 || item.status == 4" @click="shenSuInfo(item.id)">
          {{ $t('c2c.d54') }}
        </div>
      </div>
    </div>
    <div class="empty" v-if="orderList.length <= 0">{{ $t('page.Nodata') }}</div>
    <!-- <div class="more">{{ $t('page.more') }}</div> -->
    <!-- <div class="more" @click="more" v-if="isMore">{{ $t('page.more') }}</div>
      <div class="empty" @click="more" v-if="finish.length > 0 && !isMore">{{ $t('page.final') }}</div>
      <div class="empty" v-if="finish.length <= 0">{{ $t('page.Nodata') }}</div> -->

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
import { ref, getCurrentInstance } from 'vue'
import i18n from '@/i18n/index'
import { clipboard } from '@/utils/common'
import { showToast } from 'vant'
import router from '@/router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'c2c_shop_order'
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

// 搜索订单号
const orderId = ref<any>('')
const search = () => {
  getList(orderType.value, orderId.value)
}

// 获取订单列表
const getList = (type: number, orderId?: any) => {
  proxy.$api.orderList({ type: type, orderId: orderId }).then((res: any) => {
    if (res.code !== 200) return
    let data = res.data.reverse()
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
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
    if (type == 0) list0.value = data
    if (type == 1) list1.value = data
    orderType.value == 0 ? (orderList.value = list0.value) : (orderList.value = list1.value)
  })
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
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
