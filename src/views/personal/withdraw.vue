<template>
  <div class="personal">
    <div class="pubBg">
      <div class="form">
        <div class="item t10">
          <div class="label">{{ $t('withdraw.Walletaddress') }}</div>
          <div class="span" v-if="address">{{ address }}</div>
          <router-link v-else to="/personal/wallet_address">{{ $t('home.Gotoadd') }}</router-link>
        </div>
        <div class="item" v-if="type == 1">
          <div class="label">{{ $t('withdraw.Availablebalance') }}(USDT)</div>
          <div class="span">{{ amount0 || 0 }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('withdraw.Withdrawamount') }}(USDT)</div>
          <div class="right">
            <input type="number" v-model="amount" @input="amountInput" :placeholder="$t('withdraw.Pleaseenter', { num: minDrawAmount })" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('withdraw.d10') }}(USDT)</div>
          <div class="span">{{ fees || 0 }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('withdraw.d11') }}(USDT)</div>
          <div class="span">{{ receive || 0 }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('new.d16') }}</div>
          <div class="right" v-if="isPassword"><input type="password" v-model="password" :placeholder="$t('personal.Pleaseenter')" /></div>
          <router-link v-else to="/personal/password">{{ $t('new.d18') }}</router-link>
        </div>
      </div>
    </div>
    <div class="pubBtn bigBtn" @click="submit">{{ $t('password.Sure') }}</div>
    <div class="tips0 p36">
      {{ $t('withdraw.d1') }}<br />
      {{ $t('withdraw.d2') }}<br /><br />
      1. {{ $t('withdraw.d3', { num: minDrawAmount }) }}<br />
      2. {{ $t('withdraw.d4', { name: 'CEXP' }) }}<br />
      3. {{ $t('withdraw.d5') }}<br />
      4. {{ $t('withdraw.d6') }}<br />
      5. {{ $t('withdraw.d7') }}<br />
      6. {{ $t('withdraw.d8') }}<br />
      7. {{ $t('withdraw.d9', { name: 'CEXP' }) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'
import { toFixedNumber } from '@/utils/common'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_withdraw'
})

const route = useRoute()
const type = ref<any>('')
type.value = route.query.type

const address = ref<string>('')
const amount0 = ref<number>(0)
const minDrawAmount = ref<number>(1)
const weekDraw = ref<boolean>(false)
const isPassword = ref<boolean>(false)
const password = ref<string>('')
proxy.$api.walletInfo().then((res: any) => {
  if (res.code !== 200) return
  address.value = res.data.address
  amount0.value = res.data.amount
  minDrawAmount.value = res.data.minDrawAmount
  weekDraw.value = res.data.weekDraw
  isPassword.value = res.data.password
})

// 获取商家申请状态
const shopType = ref<any>(null) // null未申请、0申请中、1通过、2驳回
proxy.$api.applyStatus().then((res: any) => {
  if (res.code !== 200) return
  shopType.value = res.data.status
})

const router = useRouter()
const goBack = () => {
  router.go(-1)
}

const fees = ref<any>()
const receive = ref<any>()
const amountInput = () => {
  if (amount.value) {
    if (shopType.value != 1) {
      weekDraw.value ? (fees.value = 1 + amount.value * 0.1) : (fees.value = 1)
    } else {
      fees.value = 1
    }
    receive.value = amount.value - fees.value
    fees.value = toFixedNumber(fees.value, 3)
    receive.value = toFixedNumber(receive.value, 3)
  } else {
    amount.value = null
    fees.value = 0
    receive.value = 0
  }
}

const amount = ref<number>()
const submit = () => {
  if (!address.value || address.value.length < 2) {
    showToast(i18n.global.t('wallet.Pleaseedit'))
    return
  }
  if (!password.value) {
    showToast(i18n.global.t('forget.Pleaseenterpassword'))
    return
  }
  if (amount.value) {
    if (amount.value >= minDrawAmount.value) {
      let json = {
        drawType: type.value,
        amount: amount.value,
        password: password.value
      }
      proxy.$api.withdraw(json).then((res: any) => {
        if (res.code !== 200) return
        showToast(i18n.global.t('withdraw.Withdrawal'))
        goBack()
      })
    } else {
      showToast(i18n.global.t('withdraw.Withdrawalisless', { num: minDrawAmount.value }))
    }
  } else {
    showToast(i18n.global.t('withdraw.amount'))
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
