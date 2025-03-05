<template>
  <div class="c2cMatch">
    <div class="pubBg c2cForm" v-for="(item, i) in list">
      <div class="item mt">
        <div class="label">{{ $t('c2c.d167') }}</div>
        <div class="lr">
          <div class="span">{{ item.id }}</div>
          <div class="copy" @click="copy(item.id)">{{ $t('home.copy') }}</div>
        </div>
      </div>
      <div class="item">
        <div class="label">{{ $t('c2c.d76') }}</div>
        <div class="lr">
          <div class="span">{{ item.createTime }}</div>
          <div class="copy" @click="copy(item.createTime)">{{ $t('home.copy') }}</div>
        </div>
      </div>
      <div class="item">
        <div class="label" v-if="type == 1">{{ $t('c2c.d77') }}</div>
        <div class="label" v-if="type == 0">{{ $t('c2c.d78') }}</div>
        <div class="span">{{ item.matchAmount }} USDT</div>
      </div>
      <div class="item">
        <div class="label" v-if="type == 1">{{ $t('c2c.d79') }}</div>
        <div class="label" v-if="type == 0">{{ $t('c2c.d80') }}</div>
        <div class="span">{{ item.paymentAmount }} {{ convertRate[0].label }}</div>
      </div>
      <div class="item" v-if="type == 0">
        <div class="label">{{ $t('c2c.d81') }}</div>
        <div class="span">{{ item.paymentLabel }}</div>
      </div>
      <template v-for="item2 in item.tradeAccounts" v-if="type == 1">
        <div class="item">
          <div class="lalel" v-if="type == 1">{{ $t('c2c.d46') }}：</div>
          <div class="lalel" v-if="type == 0">{{ $t('c2c.d111') }}：</div>
          <div class="span">{{ item2.label }}</div>
        </div>
        <div class="item mt">
          <div class="lalel">{{ $t('c2c.d48') }}：</div>
          <div class="lr">
            <div class="span">{{ item2.accountName }}</div>
            <div class="copy" @click="copy(item2.accountName)">{{ $t('home.copy') }}</div>
          </div>
        </div>
        <div class="item mt">
          <div class="lalel">{{ $t('c2c.d47') }}：</div>
          <div class="lr">
            <div class="span">{{ item2.account }}</div>
            <div class="copy" @click="copy(item2.account)">{{ $t('home.copy') }}</div>
          </div>
        </div>
      </template>
      <div class="item">
        <div class="label">{{ $t('c2c.d83') }}</div>
        <div class="span">{{ item.message }}</div>
      </div>
      <div class="item" v-if="item.cancelledMessage">
        <div class="label">{{ $t('c2c.d198') }}</div>
        <div class="span">{{ item.cancelledMessage }}</div>
      </div>
      <div class="item">
        <div class="label">{{ $t('c2c.d84') }}</div>
        <div class="lr">
          <div class="span" v-if="item.status == 0">{{ $t('c2c.d85') }}</div>
          <div class="span" v-if="item.status == 1">{{ $t('c2c.d86') }}</div>
          <template v-if="item.status == 2 || item.status == 3">
            <div class="span red" v-if="item.appealStatus == 1">{{ $t('c2c.d87') }}</div>
            <div class="span" v-if="item.appealStatus == 0">{{ $t('c2c.d88') }}</div>
          </template>
          <div class="span" v-if="item.status == 4">{{ $t('c2c.d89') }}</div>
          <div class="span red" v-if="item.status == 5">{{ $t('c2c.d90') }}</div>
          <template v-if="i === 0 && tradingData.length > 0 && tradingData[0].passTime != '-1'">
            <div class="pubBtn disabled speed" v-if="time != '00:00:00'">{{ $t('c2c.d171') }} {{ time }}</div>
            <div class="pubBtn speed" v-if="tradingData[0].isAccelerate == 0 && time == '00:00:00'" @click="accelerate(tradingData[0].id)">
              <template v-if="!isLoading">{{ $t('c2c.d171') }}</template>
              <van-loading v-else />
            </div>
            <div class="pubBtn disabled speed" v-if="tradingData[0].isAccelerate == 1">{{ $t('c2c.d172') }}</div>
          </template>
        </div>
      </div>
      <div class="item" v-if="item.images.length > 0">
        <van-uploader v-model="item.images" multiple max-count="3" :disabled="true" :deletable="false" />
      </div>
      <div class="btnBox" v-if="item.status == 2 || item.status == 3 || item.status == 4">
        <div class="btn" @click="shenSuInfo(item.id)">
          {{ $t('c2c.d54') }}
        </div>
      </div>
    </div>
    <div class="empty" v-if="list.length <= 0">{{ $t('page.Nodata') }}</div>
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
          <div class="tit" v-if="type == 1">{{ $t('c2c.d135') }}</div>
          <div class="tit" v-if="type == 0">{{ $t('c2c.d136') }}</div>
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
          <div class="tit" v-if="type == 0">{{ $t('c2c.d135') }}</div>
          <div class="tit" v-if="type == 1">{{ $t('c2c.d136') }}</div>
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
import { useRoute } from 'vue-router'
import i18n from '@/i18n/index'
import { clipboard, Countdown } from '@/utils/common'
import { showToast, showConfirmDialog } from 'vant'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'c2c_match'
})

// 复制
const copy = (key: any) => {
  clipboard(key) ? showToast(i18n.global.t('home.Copiedsuccessfully')) : showToast(i18n.global.t('home.Copyfailed'))
}

const isMore = ref<boolean>(true)
const more = () => {
  if (isMore.value) {
    // finishPage.pageNum++
    // taskPage(finishPage)
  }
}

const route = useRoute()
const list = ref<any>([])
const type = ref<any>(null)
type.value = route.query.type

// 获取汇率
const convertRate = ref<any>()
proxy.$api.walletConvertRate(type.value == 1 ? 'biz_sell_wallet_rate' : 'biz_buy_wallet_rate').then((res: any) => {
  if (res.code !== 200) return
  convertRate.value = res.data
})

let timer = null
const time = ref<any>(null)
const tradingData = ref<any>([])
const getList = () => {
  if (timer) timer.stop()
  proxy.$api.tradingList({ type: type.value, source: 0 }).then((res: any) => {
    if (res.code !== 200) return
    if (res.data.length > 0) {
      tradingData.value = res.data
      if (res.data[0].passTime != '-1') tradingData.value[0].passTime = 3600 - parseInt(res.data[0].passTime)
      if (tradingData.value[0].isAccelerate == 0 && tradingData.value[0].passTime > 0) {
        timer = new Countdown(
          tradingData.value[0].passTime,
          true,
          (remainingTime) => {
            time.value = remainingTime
          },
          () => {
            if (timer) clearTimeout(timer)
          }
        )
        timer.start()
      } else {
        time.value = '00:00:00'
      }
    }
    proxy.$api.matchRecord(type.value).then((res: any) => {
      if (res.code !== 200) return
      list.value = [...res.data, ...tradingData.value].reverse()
      for (let i = 0; i < list.value.length; i++) {
        // 交易凭证
        list.value[i].images = JSON.parse(list.value[i].images || '[]')
        if (list.value[i].images.length > 0) {
          let arr = []
          for (let i2 = 0; i2 < list.value[i].images.length; i2++) {
            arr.push({ url: list.value[i].images[i2] })
          }
          list.value[i].images = arr
        }
      }
      proxy.$api.walletPayTypes().then((res: any) => {
        if (res.code !== 200) return
        for (let i = 0; i < list.value.length; i++) {
          // 匹配支付类型展示文案
          list.value[i].paymentLabel = list.value[i].paymentType
            .map((num: any) => res.data.find((item: any) => item.value == num.toString()))
            .filter((item: any) => item) // 过滤掉未找到的项
            .map((item: any) => item.label) // 提取 label
            .join('/')
        }
      })
    })
  })
}
getList()

// 加速
const isLoading = ref<boolean>(false)
const accelerate = (id: any) => {
  isLoading.value = true
  proxy.$api.accelerate(id).then((res: any) => {
    if (res.code !== 200) {
      isLoading.value = false
      return
    }
    isLoading.value = false
    showConfirmDialog({
      showCancelButton: false,
      message: i18n.global.t('c2c.d196')
    }).then(() => {
      tradingData.value[0].isAccelerate = 1
    })
  })
}

const showAppeal = ref<boolean>(false)
const appealInfo = ref<any>({})
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
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
