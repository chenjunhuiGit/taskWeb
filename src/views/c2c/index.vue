<template>
  <div class="c2cIndex">
    <div class="top pubBg">
      <img src="@/assets/icon10.png" alt="" />
      <template v-if="shopType == null">
        <div class="p">{{ $t('c2c.d1', { name: 'CEXP' }) }}</div>
        <div class="p2">{{ $t('c2c.d2') }}</div>
        <div class="pubBtn" @click="shopBtn">{{ $t('c2c.d3') }}<van-icon name="arrow" /></div>
      </template>
      <template v-if="shopType == 0">
        <div class="p">{{ $t('c2c.d4') }}</div>
        <div class="p2">{{ $t('c2c.d5') }}</div>
        <div class="pubBtn disabled">{{ $t('c2c.d6') }}</div>
      </template>
      <template v-if="shopType == 2">
        <div class="p error">{{ $t('c2c.d7') }}</div>
        <div class="p2">{{ $t('c2c.d8') }}</div>
        <div class="pubBtn" @click="shopBtn">{{ $t('c2c.d3') }}<van-icon name="arrow" /></div>
      </template>
      <template v-if="shopType == 1">
        <div class="p">{{ $t('c2c.d1', { name: 'CEXP' }) }}</div>
        <div class="p2">{{ $t('c2c.d9') }}</div>
        <router-link class="pubBtn" to="/c2c/shop">{{ $t('c2c.d10') }}<van-icon name="arrow" /></router-link>
      </template>
    </div>
    <div class="itemBox">
      <div class="pubBg item">
        <div class="btn" v-if="shopType != 6">
          <div :class="shopType == 1 ? 'pubBtn disabled' : 'pubBtn'" v-if="id1" @click="tradeClick(1)">{{ $t('c2c.d132') }}</div>
          <div :class="shopType == 1 ? 'pubBtn disabled' : 'pubBtn'" v-else @click="tradeClick(1)">{{ $t('c2c.d12') }}</div>
        </div>
        <div class="text">
          <div class="p">{{ $t('c2c.d13') }}</div>
        </div>
        <div class="tit">
          <router-link to="/c2c/match?type=1">{{ $t('c2c.d11') }}<van-icon name="arrow" /></router-link>
        </div>
      </div>
      <div class="pubBg item">
        <div class="btn" v-if="shopType != 6">
          <div :class="shopType == 1 ? 'pubBtn disabled' : 'pubBtn'" v-if="!isSellMatch && id0" @click="tradeClick(0)">{{ $t('c2c.d132') }}</div>
          <div :class="( shopType == 1 || !payTask )? 'pubBtn disabled' : 'pubBtn'" v-if="!isSellMatch && !id0" @click="tradeClickCopy(0)">{{ $t('c2c.d14') }}</div>
          <div :class="shopType == 1 ? 'pubBtn disabled' : 'pubBtn'" v-if="isSellMatch" @click="tradeClick(0)">{{ $t('c2c.d197') }}</div>
        </div>
        <div class="text">
          <div class="p">{{ $t('c2c.d203') }}</div>
        </div>
        <div class="tit">
          <router-link to="/c2c/match?type=0">{{ $t('c2c.d11') }}<van-icon name="arrow" /></router-link>
        </div>
      </div>
    </div>
    <van-dialog v-model:show="show" :title="$t('c2c.d15')" :show-confirm-button="false">
      <div class="c2cForm">
        <van-icon class="close" name="cross" @click="show = false" />
        <div class="item">
          <div class="label">{{ $t('c2c.d16') }}</div>
          <div class="right">
            <input type="text" v-model="realName" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('c2c.d17') }}</div>
          <div class="right">
            <input type="text" v-model="contactDetails" placeholder="telegram" />
          </div>
        </div>
        <div class="br">*{{ $t('c2c.d18') }}</div>
        <div class="btnBox">
          <div class="btn" @click="shopCreate">{{ $t('c2c.d19') }}</div>
        </div>
      </div>
    </van-dialog>
    <van-dialog v-model:show="showTrade" :title="orderType == 1 ? $t('c2c.d20') : $t('c2c.d21')" :show-confirm-button="false">
      <div class="c2cForm">
        <van-icon class="close" name="cross" @click="closeMatch" />
        <div class="item">
          <div class="label" v-if="orderType == 1">{{ $t('c2c.d22') }}</div>
          <div class="label" v-else>{{ $t('c2c.d23') }}</div>
          <div class="right" v-if="!isMatch">
            <input type="text" v-model="amount" @input="paymentInput" :placeholder="$t('personal.Pleaseenter')" />
            <div class="all" v-if="orderType == 0" @click="sellAll">{{ $t('c2c.d24') }}</div>
            <span>USDT</span>
          </div>
          <div class="span" v-else>{{ amount }} USDT</div>
        </div>
        <div class="br2 mt" v-if="orderType == 0">
          {{ $t('c2c.d25') }} <span>{{ userAmount }} USDT</span>，{{ $t('c2c.d26') }}
        </div>
        <div class="item" v-if="orderType == 0">
          <div class="label">{{ $t('withdraw.d10') }}</div>
          <div class="span" v-if="weekUserSell">{{ toFixedNumber(amount * 0.1, 2) || 0 }} USDT</div>
          <div class="span" v-else>0 USDT</div>
        </div>
        <div class="br2 mt" v-if="orderType == 0">{{ $t('c2c.d146') }}</div>
        <div class="item">
          <div class="label" v-if="orderType == 1">{{ $t('c2c.d27') }}</div>
          <div class="label" v-else>{{ $t('c2c.d28') }}</div>
          <div class="blue" v-if="!isMatch && convertRate">{{ paymentAmount }} {{ convertRate[0].label }}</div>
          <div class="span" v-if="isMatch && convertRate">{{ paymentAmount }} {{ convertRate[0].label }}</div>
        </div>
        <div class="br2 mt" v-if="convertRate">
          {{ $t('c2c.d29') }}：<span>1USDT≈{{ convertRate[0].value }} {{ convertRate[0].label }}</span>
        </div>
        <div class="br2">{{ $t('c2c.d30') }}</div>
        <div class="item">
          <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d46') }}：</div>
          <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d111') }}：</div>
          <template v-if="payList.length <= 0">
            <router-link class="blue" to="/userCenter">{{ $t('c2c.d32') }}</router-link>
          </template>
          <template v-else>
            <div class="right" @click="showPay = true" v-if="!isMatch">
              <input type="text" v-model="payTypeLabel" readonly :placeholder="$t('home.pleasechoose')" />
              <van-icon class="down" name="play" />
            </div>
            <div class="span" v-else>{{ payTypeLabel }}</div>
          </template>
        </div>
        <div class="item">
          <div class="label">{{ $t('c2c.d33') }}</div>
          <div class="right" v-if="!isMatch">
            <input type="text" v-model="message" :placeholder="$t('c2c.d34')" />
          </div>
          <div class="span" v-else>{{ message }}</div>
        </div>
        <div class="btnBox">
          <div class="btn" v-if="!isMatch" @click="matchClick">{{ $t('forget.submit') }}</div>
          <div class="btn dis" v-else>{{ $t('c2c.d197') }}</div>
        </div>
      </div>
    </van-dialog>

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

    <van-dialog v-model:show="showMatch" :title="$t('c2c.d38')" :show-confirm-button="false">
      <div class="c2cForm">
        <van-icon class="close" name="cross" @click="hideMatch" />
        <div class="item">
          <div class="label">{{ $t('c2c.d167') }}</div>
          <div class="span">{{ orderInfo.id }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('c2c.d39') }}</div>
          <div class="span">{{ orderInfo.createTime }}</div>
        </div>
        <div class="item">
          <div class="label" v-if="orderType == 1">{{ $t('c2c.d40') }}</div>
          <div class="label" v-else>{{ $t('c2c.d41') }}</div>
          <div class="span">{{ orderInfo.matchAmount }} USDT</div>
        </div>
        <div class="item">
          <div class="label" v-if="orderType == 1">{{ $t('c2c.d117') }}</div>
          <div class="label" v-else>{{ $t('c2c.d43') }}</div>
          <div class="span">{{ orderInfo.paymentAmount }} {{ convertRate[0].label }}</div>
        </div>
        <!-- <div class="item flexStart">
          <div class="label" v-if="orderType == 1">{{ $t('c2c.d45') }}</div>
          <div class="label" v-if="orderType == 0">{{ $t('c2c.d46') }}</div>
          <div class="account">
            <div class="acc" v-for="item in orderInfo.tradeAccounts">
              <div class="span">{{ item.label }}</div>
              <div class="lr">
                <div class="span">
                  {{ item.accountName }}
                </div>
                <div class="copy" @click="copy(item.accountName)">{{ $t('home.copy') }}</div>
              </div>
              <div class="lr">
                <div class="span">
                  {{ item.account }}
                </div>
                <div class="copy" @click="copy(item.account)">{{ $t('home.copy') }}</div>
              </div>
            </div>
          </div>
        </div> -->
        <template v-for="item2 in orderInfo.tradeAccounts">
          <div class="item">
            <div class="lalel" v-if="orderType == 1">{{ $t('c2c.d46') }}：</div>
            <div class="lalel" v-if="orderType == 0">{{ $t('c2c.d111') }}：</div>
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
          <div class="label">{{ $t('c2c.d49') }}</div>
          <div class="span">{{ orderInfo.message }}</div>
        </div>
        <!-- <div class="item">
          <div class="label">在线联系</div>
          <div class="chat pubBtn"><img src="@/assets/icon17.png" alt="" />立即沟通</div>
        </div> -->
        <div class="item" v-if="showTime && orderType == 1">
          <div class="label">{{ $t('working.Timeleft') }}</div>
          <div class="span">{{ time }}</div>
        </div>
        <div class="item" v-if="orderType == 1">
          <van-uploader v-if="!isPay" v-model="fileList2" max-count="3" :after-read="afterRead" />
          <van-uploader v-else v-model="fileList2" multiple max-count="3" :disabled="true" :deletable="false" />
        </div>
        <div class="btnBox" v-if="orderType == 1 && time != $t('working.Timedout')">
          <div class="btn dis" v-if="isPay && !isShensu">{{ $t('c2c.d50') }}</div>
          <div class="btn" v-if="!isPay && fileList2.length > 0" @click="iPay">{{ $t('c2c.d51') }}</div>
          <div class="btn dis" v-if="!isPay && fileList2.length <= 0">{{ $t('c2c.d51') }}</div>
          <div class="btn2" v-if="!isPay" @click="orderCancel">{{ $t('c2c.d52') }}</div>
          <div class="btn2" v-if="isPay && !isBuyAppeal" @click="shensuClick">{{ $t('c2c.d53') }}</div>
          <div class="btn" v-if="isShensu" @click="shenSuInfo">{{ $t('c2c.d54') }}</div>
        </div>
        <div class="tips" v-if="orderType == 1 && !isPay">
          {{ $t('c2c.d169') }}<br />
          {{ $t('c2c.d170') }}
        </div>
        <div class="btnBox" v-if="orderType == 0">
          <div class="btn dis" v-if="!isPay">{{ $t('c2c.d56') }}</div>
          <!-- <div class="btn" v-if="isPay && !isShensu" @click="confirmPay">{{ $t('c2c.d57') }}</div>
          <div class="btn2" v-if="isPay && !isSellAppeal" @click="shensuClick">{{ $t('c2c.d53') }}</div>
          <div class="btn" v-if="isShensu" @click="shenSuInfo">{{ $t('c2c.d54') }}</div> -->
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

    <van-dialog v-model:show="showTips" :title="$t('c2c.d147')" :confirm-button-text="$t('home.agree')" @confirm="confirmTips" show-cancel-button>
      <div class="c2cFormHeight">
        <p class="dialog-p" v-if="orderType == 0">{{ $t('c2c.d202') }}</p>
        <p class="dialog-p" v-if="orderType == 1">{{ $t('c2c.d148') }}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onUnmounted } from 'vue'
import { showToast, showConfirmDialog, showDialog } from 'vant'
import { clipboard, Countdown, toFixedNumber } from '@/utils/common'
import { isRequired } from '@/utils/validators'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'c2c'
})

const show = ref<boolean>(false)
const showTrade = ref<boolean>(false)
const showPay = ref<boolean>(false)
const showMatch = ref<boolean>(false)
const showShensu = ref<boolean>(false)
const showTips = ref<boolean>(false)
const isMatch = ref<boolean>(false)
const showAppeal = ref<boolean>(false)
const appealInfo = ref<any>({})
const payList = ref<any>([])
const userAmount = ref<any>(null)
const convertRate = ref<any>()
const orderType = ref<number>(1) // 1购买、0出售
const amount = ref<any>(null)
const paymentAmount = ref<any>(0)
const message = ref<string>('')
const cause = ref<string>('')
const orderInfo = ref<any>({}) // 未完成的公用订单信息
const isPay = ref<boolean>(false) // 是否付款
const isShensu = ref<boolean>(false) // 是否申诉
const isCancel = ref<boolean>(false) // 是否取消订单
const weekUserSell = ref<boolean>(false) // 用户本周是否出售过
const payTask = ref<boolean>(false) // 用户是否激活过付费任务

// 复制
const copy = (key: any) => {
  clipboard(key) ? showToast(i18n.global.t('home.Copiedsuccessfully')) : showToast(i18n.global.t('home.Copyfailed'))
}

// 获取商家申请状态
const shopType = ref<any>(6) // null未申请、0申请中、1通过、2驳回
const realName = ref<string>('')
const contactDetails = ref<string>('')
const applyStatus = () => {
  proxy.$api.applyStatus().then((res: any) => {
    if (res.code !== 200) return
    shopType.value = res.data.status
  })
}
applyStatus()

// 获取正在交易中的订单信息
let timer3: any = null
const showTime = ref<boolean>(false)
const time = ref<any>(null) // 倒计时
const isSellAppeal = ref<boolean>(false) // 卖方是否申诉
const isBuyAppeal = ref<boolean>(false) // 买方是否申诉
const tradingList0 = () => {
  proxy.$api.tradingList({ type: orderType.value, source: 0 }).then((res: any) => {
    if (res.code !== 200) return
    if (res.data.length > 0) {
      // 存在交易中的订单
      orderInfo.value = res.data[0]
      showMatch.value = true
      isPay.value = orderInfo.value.paymentStatus == 0
      isShensu.value = orderInfo.value.status == 4
      orderType.value == 0 ? (id0.value = orderInfo.value.id) : (id1.value = orderInfo.value.id) // 买卖按钮是否显示进行中
      isSellAppeal.value = orderInfo.value.sellAppealStatus == 1
      isBuyAppeal.value = orderInfo.value.buyAppealStatus == 1

      if (orderInfo.value.images) {
        let images = JSON.parse(orderInfo.value.images)
        fileList2.value = []
        for (let i = 0; i < images.length; i++) {
          fileList2.value.push({ url: images[i] })
        }
      }

      if (orderType.value == 0) {
        // 正在出售
        if (!isPay.value) {
          // 轮询查询商家付款
          timer2 = setTimeout(() => {
            isFor = true
            tradingList()
          }, 3000)
        }
      }
      if (orderType.value == 1) {
        // 正在购买
        if (isPay.value) {
          // 轮询查询订单是否完成
          timer2 = setTimeout(() => {
            isFor = true
            tradingList()
          }, 3000)
        }
      }
      // 匹配支付类型展示文案
      orderInfo.value.paymentLabel = orderInfo.value.paymentType
        .map((num: any) => payList.value.find((item: any) => item.value == num.toString()))
        .filter((item: any) => item) // 过滤掉未找到的项
        .map((item: any) => item.label) // 提取 label
        .join('/')

      // 倒计时
      if (!isPay.value && orderInfo.value.remainingTime >= 0) {
        showTime.value = true
        timer3 = new Countdown(
          orderInfo.value.remainingTime,
          true,
          (remainingTime) => {
            time.value = remainingTime
          },
          () => {
            time.value = i18n.global.t('working.Timedout')
            if (timer2) clearTimeout(timer2)
            tradingList()
          }
        )
        timer3.start()
      } else {
        time.value = null
        showTime.value = false
      }
    } else {
      // 不存在交易中的订单
      orderType.value == 0 ? (id0.value = '') : (id1.value = '') // 买卖按钮是否显示进行中
      showMatch.value = false // 关闭匹配成功弹窗
      isMatch.value = false

      if (isCancel.value) {
        // 主动取消订单
        showToast(i18n.global.t('c2c.d62'))
        isCancel.value = false
        return
      }

      if (isConfirmPay) {
        // 确认收款
        isConfirmPay = false
        return
      }

      if (!isFor) {
        // 不在轮询
        if (isBuySellClick.value) {
          // 点击买卖按钮
          showTrade.value = true
          isBuySellClick.value = false
        }
        amount.value = ''
        paymentAmount.value = 0
        message.value = ''
        payTypeLabel.value = ''
        paymentType.value = []
        return
      }

      if (isFor) {
        // 轮询中, 被动取消订单
        showToast(i18n.global.t('c2c.d63'))
        time.value = null
        isFor = false
        showShensu.value = false
        showAppeal.value = false
        return
      }
    }
  })
}

let isFor = false // 是否在轮询
let timer2: any = null
let timer4: any = null
const tradingList = () => {
  if (timer2) clearTimeout(timer2)
  if (timer4) clearTimeout(timer4)
  if (timer3) timer3.stop()

  // 不在轮询中，才重置数据
  if (!isFor) {
    orderInfo.value = {}
    isPay.value = false
    isShensu.value = false
  }

  if (orderType.value == 1) {
    proxy.$api.walletPayTypes().then((res: any) => {
      if (res.code !== 200) return
      payList.value = res.data
      tradingList0()
    })
  }
  if (orderType.value == 0) {
    proxy.$api.tradeAccountList().then((res: any) => {
      if (res.code !== 200) return
      payList.value = res.data
      if (res.data.length > 0) {
        for (let i = 0; i < payList.value.length; i++) {
          payList.value[i].value = payList.value[i].type
        }
      }

      // proxy.$api.getUserRelease().then((res: any) => {
      //   if (res.code !== 200) return
      //   if (res.data) {
      //     // 离线匹配中
      //     if (!isSellMatch.value) isSellMatch.value = true
      //     if (!showTrade.value) showTrade.value = true
      //     if (!isMatch.value) isMatch.value = true
      //     amount.value = res.data.amount
      //     paymentType.value = res.data.paymentType
      //     message.value = res.data.message

      //     if (weekUserSell.value) {
      //       paymentAmount.value = toFixedNumber(amount.value * 0.9 * parseFloat(convertRate.value[0].value), 2)
      //     } else {
      //       paymentAmount.value = amount.value * parseFloat(convertRate.value[0].value)
      //     }

      //     // 匹配支付类型展示文案
      //     payTypeLabel.value = [paymentType.value]
      //       .map((num: any) => payList.value.find((item: any) => item.value == num.toString()))
      //       .filter((item: any) => item) // 过滤掉未找到的项
      //       .map((item: any) => item.label) // 提取 label
      //       .join('/')

      //     let arr = []
      //     for (let i = 0; i < payList.value.length; i++) {
      //       if (payList.value[i].id == res.data.tradeAccountId) {
      //         arr.push(payList.value[i])
      //       }
      //     }
      //     paymentType.value = arr

      //     timer4 = setTimeout(() => {
      //       tradingList()
      //     }, 2000)
      //   } else {
      //     if (showTrade.value) showTrade.value = false
      //     isSellMatch.value = false
      //     tradingList0()
      //   }
      // })
      tradingList0()
    })
  }
}

const accountName = ref<string>('')
const payTypeClick = (item: any) => {
  for (let i = 0; i < payList.value.length; i++) {
    if (orderType.value == 1) {
      if (item.value == payList.value[i].value) {
        payList.value[i].checked = true
      } else {
        payList.value[i].checked = false
      }
    }
    if (orderType.value == 0) {
      if (item.id == payList.value[i].id) {
        payList.value[i].checked = true
        accountName.value = payList.value[i].accountName
      } else {
        payList.value[i].checked = false
      }
    }
  }
}

const tradeAccountIds = ref<any>([])
const paymentType = ref<any>([])
const payTypeLabel = ref<string>('')
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
  payTypeLabel.value = arr.join('/')
  showPay.value = false
}

// 商家申请按钮
const shopBtn = () => {
  // 获取钱包信息
  proxy.$api.walletInfo().then((res: any) => {
    if (res.code !== 200) return
    if (res.data.amount < 50) {
      showDialog({
        title: i18n.global.t('c2c.d139'),
        message: i18n.global.t('c2c.d140')
      }).then(() => {
        // on close
      })
    } else {
      show.value = true
    }
  })
}

// 商家申请
const shopCreate = () => {
  if (!isRequired(realName.value)) {
    showToast(i18n.global.t('c2c.d64'))
  } else if (!isRequired(contactDetails.value)) {
    showToast(i18n.global.t('c2c.d65'))
  } else {
    proxy.$api
      .applyCreate({
        realName: realName.value,
        contactDetails: contactDetails.value
      })
      .then((res: any) => {
        if (res.code !== 200) return
        showToast(i18n.global.t('c2c.d66'))
        show.value = false
        applyStatus()
      })
  }
}

// 图片上传
const fileList = ref<any>([])
const fileList2 = ref<any>([])
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

// 确认收款
let isConfirmPay = false
const confirmPay = () => {
  showConfirmDialog({
    message: i18n.global.t('c2c.d67')
  }).then(() => {
    proxy.$api.confirmReceivePayment(orderInfo.value.id).then((res: any) => {
      if (res.code == 600044) {
        // 订单申诉中
        isShensu.value = true
      }
      if (res.code !== 200) return
      showToast(i18n.global.t('c2c.d126'))
      isFor = false
      isConfirmPay = true
      tradingList0()
    })
  })
}

// 取消订单
const orderCancel = () => {
  showConfirmDialog({
    message: i18n.global.t('c2c.d52') + '?'
  }).then(() => {
    proxy.$api.orderCancelled({ orderId: orderInfo.value.id }).then((res: any) => {
      if (res.code !== 200) return
      isCancel.value = true
      isFor = false
      time.value = null
      orderInfo.value = {}
      tradingList()
    })
  })
}

// 关闭匹配成功弹窗，停止状态轮询
const hideMatch = () => {
  showMatch.value = false
  isMatch.value = false
  if (timer2) {
    isFor = false
    clearTimeout(timer2)
  }
  if (timer3) timer3.stop()
}

// 获取申诉信息
const shenSuInfo = () => {
  showAppeal.value = true
  appealInfo.value = {}
  proxy.$api.appealDetails(orderInfo.value.id).then((res: any) => {
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

// 点击申诉按钮
const shensuClick = () => {
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
    source: 0,
    paymentAmount: orderInfo.value.paymentAmount,
    tradeType: orderInfo.value.tradeType,
    orderId: orderInfo.value.id,
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
    isShensu.value = true
    orderType.value == 0 ? (isSellAppeal.value = true) : (isBuyAppeal.value = true)
    showShensu.value = false
  })
}

// 确认付款
const iPay = () => {
  showConfirmDialog({
    title: i18n.global.t('c2c.d71'),
    message: i18n.global.t('c2c.d72')
  }).then(() => {
    let json = {
      orderId: orderInfo.value.id,
      images: []
    }
    for (let i = 0; i < fileList2.value.length; i++) {
      if (fileList2.value[i].url) json.images[i] = fileList2.value[i].url
    }
    if (fileList2.value.length <= 0 || json.images.length <= 0) {
      showToast(i18n.global.t('c2c.d69'))
      return
    }
    proxy.$api.orderConfirmPayment(json).then((res: any) => {
      if (res.code !== 200) return
      isPay.value = true
      tradingList0()
    })
  })
}

// 买卖按钮
const isBuySellClick = ref<boolean>(false)

const tradeClickCopy = (type: number) => {
  if (!payTask.value) {  // 未激活过付费任务的不能使用该功能
      showToast(i18n.global.t('c2c.d209'))
      return
  }
  tradeClick(type)
}
const tradeClick = (type: number) => {
  proxy.$api.applyStatus().then((res: any) => {
    if (res.code !== 200) return
    shopType.value = res.data.status
    
    //商家不能使用该功能
    if (shopType.value == 1) return

    if (authStatus.value != 2) {
      showToast(i18n.global.t('personal.d15'))
      return
    }
    if (noPay.value) {
      showToast(i18n.global.t('c2c.d133'))
      return
    }
    orderType.value = type
    showTips.value = true
    fileList2.value = []
    if ((id0.value && orderType.value == 0) || (id1.value && orderType.value == 1) || isSellMatch.value) {
      confirmTips()
    }
  })
}
// 买卖前的提示确认
const confirmTips = () => {
  showTips.value = false

  isBuySellClick.value = true
  tradingList()
  if (orderType.value == 0) {
    proxy.$api.walletInfo().then((res: any) => {
      if (res.code !== 200) return
      userAmount.value = res.data.amount
      weekUserSell.value = res.data.weekUserSell
    })
  }

  // 获取汇率
  if (orderType.value == 1) {
    proxy.$api.walletConvertRate('biz_sell_wallet_rate').then((res: any) => {
      if (res.code !== 200) return
      convertRate.value = res.data
    })
  }
  if (orderType.value == 0) {
    proxy.$api.walletConvertRate('biz_buy_wallet_rate').then((res: any) => {
      if (res.code !== 200) return
      convertRate.value = res.data
    })
  }
}
const paymentInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  // 如果输入值小于等于0，则将其清空或设为1（根据需求调整）
  if (!/^\d*\.?\d*$/.test(value) || parseFloat(value) <= 0) {
    amount.value = ''
  } else {
    amount.value = parseInt(value) || ''
    if (orderType.value == 0 && weekUserSell.value) {
      paymentAmount.value = toFixedNumber(amount.value * 0.9 * parseFloat(convertRate.value[0].value), 2)
    } else {
      paymentAmount.value = amount.value * parseFloat(convertRate.value[0].value)
    }
  }
}
const sellAll = () => {
  amount.value = parseInt(userAmount.value)
  if (orderType.value == 0 && weekUserSell.value) {
    paymentAmount.value = toFixedNumber(amount.value * 0.9 * parseFloat(convertRate.value[0].value), 2)
  } else {
    paymentAmount.value = amount.value * parseFloat(convertRate.value[0].value)
  }
}

// 匹配中
let timer: any = null
const tradeMatch = () => {
  if (timer) clearTimeout(timer)
  isMatch.value = true
  proxy.$api
    .tradeMatch({
      tradeAccountIds: tradeAccountIds.value,
      amount: amount.value,
      type: orderType.value,
      paymentType: paymentType.value,
      paymentAmount: paymentAmount.value,
      message: message.value
    })
    .then((res: any) => {
      if (res.code !== 200) {
        isMatch.value = false
        return
      }
      if (!res.data) {
        // 匹配失败，轮询重新匹配
        timer = setTimeout(() => {
          tradeMatch()
        }, 3000)
      } else {
        showTrade.value = false
        tradingList()
      }
    })
}

// 匹配按钮
const matchClick = () => {
  if (!isRequired(amount.value)) {
    showToast(i18n.global.t('c2c.d73'))
    return
  }
  if (parseFloat(amount.value) < 5) {
    showToast(i18n.global.t('c2c.d131'))
    return
  }
  if (paymentType.value.length <= 0) {
    showToast(i18n.global.t('c2c.d74'))
    return
  }
  if (orderType.value == 0 && amount.value > userAmount.value) {
    showToast(i18n.global.t('error600016'))
    return
  }
  if (orderType.value == 1) {
    // 购买实时匹配
    tradeMatch()
  }
  if (orderType.value == 0) {
    showTrade.value = false
    // 出售离线匹配
    showConfirmDialog({
      showCancelButton: false,
      message: i18n.global.t('c2c.d168', { paymentAmount: paymentAmount.value, convertRate: convertRate.value[0].label, accountName: accountName.value })
    }).then(() => {
      tradeMatch()
      amount.value = ''
      paymentAmount.value = 0
      message.value = ''
      payTypeLabel.value = ''
      paymentType.value = []
    })
    // proxy.$api
    //   .UserRelease({
    //     tradeAccountIds: tradeAccountIds.value,
    //     amount: amount.value,
    //     type: orderType.value,
    //     paymentType: paymentType.value,
    //     paymentAmount: paymentAmount.value,
    //     message: message.value
    //   })
    //   .then((res: any) => {
    //     if (res.code !== 200) return
    //     showTrade.value = false
    //     isSellMatch.value = true
    //     showConfirmDialog({
    //       showCancelButton: false,
    //       message: i18n.global.t('c2c.d168', { paymentAmount: paymentAmount.value, convertRate: convertRate.value[0].label, accountName: accountName.value })
    //     }).then(() => {
    //       amount.value = ''
    //       paymentAmount.value = 0
    //       message.value = ''
    //       payTypeLabel.value = ''
    //       paymentType.value = []
    //     })
    //   })
  }
}

// 关闭匹配状态
const closeMatch = () => {
  if (orderType.value == 1 && isMatch.value) {
    showConfirmDialog({
      message: i18n.global.t('c2c.d75')
    })
      .then(() => {
        showTrade.value = false
        isMatch.value = false
        if (timer) clearTimeout(timer)
        if (timer2) clearTimeout(timer2)
        if (timer4) clearTimeout(timer4)
      })
      .catch(() => {})
  } else {
    showTrade.value = false
    if (timer) clearTimeout(timer)
    if (timer2) clearTimeout(timer2)
    if (timer4) clearTimeout(timer4)
  }
}

// 获取正在交易中的订单信息
const id0 = ref<string>('')
const id1 = ref<string>('')
const isSellMatch = ref<boolean>(false)
// 出售
// proxy.$api.getUserRelease().then((res: any) => {
//   if (res.code !== 200) return
//   if (res.data) {
//     // 离线匹配中
//     isSellMatch.value = true
//   } else {
//     isSellMatch.value = false
//     proxy.$api.tradingList({ type: 0, source: 0 }).then((res: any) => {
//       if (res.code !== 200) return
//       if (res.data.length > 0) {
//         // 存在交易中的订单
//         id0.value = res.data[0].id // 买卖按钮是否显示进行中
//       }
//     })
//   }
// })
proxy.$api.tradingList({ type: 0, source: 0 }).then((res: any) => {
  if (res.code !== 200) return
  if (res.data.length > 0) {
    // 存在交易中的订单
    id0.value = res.data[0].id // 买卖按钮是否显示进行中
  }
})

// 购买
proxy.$api.tradingList({ type: 1, source: 0 }).then((res: any) => {
  if (res.code !== 200) return
  if (res.data.length > 0) {
    // 存在交易中的订单
    id1.value = res.data[0].id // 买卖按钮是否显示进行中
  }
})

// 检查是否有收款账号
const noPay = ref<boolean>(false)
proxy.$api.tradeAccountList().then((res: any) => {
  if (res.code !== 200) return
  if (res.data.length <= 0) noPay.value = true
})

// 检查是否认证
const authStatus = ref<any>(null)
proxy.$api.userInfo().then((res: any) => {
  if (res.code !== 200) return
  payTask.value = Boolean(res.data.payTask)
  authStatus.value = res.data.authStatus
})

// 离开页面清除倒计时
onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (timer2) clearInterval(timer2)
  if (timer3) timer3.stop()
  if (timer4) clearInterval(timer4)
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
