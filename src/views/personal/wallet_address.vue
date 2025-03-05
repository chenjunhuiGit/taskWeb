<template>
  <div class="personal">
    <div class="pubBg">
      <div class="tips0">{{ $t('wallet.Pleaseedit') }}</div>
      <div class="form">
        <div class="item" v-if="info.address">
          <div class="label">{{ $t('wallet.Originaladdress') }}</div>
          <div class="span">{{ info.address }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('wallet.Newaddress') }}</div>
          <div class="right"><input type="text" v-model="address" :placeholder="$t('personal.Pleaseenter')" /></div>
        </div>
        <div class="br">{{ $t('wallet.Makesure') }}</div>
        <div class="item">
          <div class="label">{{ $t('new.d16') }}</div>
          <div class="right" v-if="info.password"><input type="password" v-model="password" :placeholder="$t('personal.Pleaseenter')" /></div>
          <router-link v-else to="/personal/password">{{ $t('new.d18') }}</router-link>
        </div>
        <!-- <div class="item">
          <div class="label">{{ $t('personal.Mail') }}</div>
          <div class="span">{{ info.email }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('password.E-mailverification') }}</div>
          <div class="right">
            <input type="text" v-model="code" :placeholder="$t('personal.Pleaseenter')" />
            <span class="send" v-if="parseInt(time) > 0">{{ time }}S</span>
            <van-loading v-if="loading" />
            <span class="send" v-if="!loading && parseInt(time) <= 0" @click="sendCode">{{ $t('password.Send') }}</span>
          </div>
        </div> -->
      </div>
    </div>
    <div class="pubBtn bigBtn" @click="submit">{{ $t('password.Sure') }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Countdown } from '@/utils/common'
import { isRequired } from '@/utils/validators'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_wallet_address'
})

const info = reactive<any>({
  email: '',
  address: '',
  password: true
})
proxy.$api.userInfo().then((res: any) => {
  if (res.code !== 200) return
  info.email = res.data.email
})
proxy.$api.walletInfo().then((res: any) => {
  if (res.code !== 200) return
  info.address = res.data.address
  info.password = res.data.password
})

const router = useRouter()
const goBack = () => {
  router.go(-1)
}

const address = ref<string>('')
const password = ref<string>('')
const code = ref<string>('')
const loading = ref<boolean>(false)
const time = ref<string>('0')
const timer = new Countdown(
  60, // 60秒倒计时
  false,
  (remainingTime) => {
    time.value = remainingTime
  },
  () => {
    // console.log('倒计时结束')
  }
)
const sendCode = () => {
  loading.value = true
  proxy.$api.sendCode(info.email).then((res: any) => {
    loading.value = false
    if (res.code !== 200) return
    showToast(i18n.global.t('forget.Sentsuccessfully'))
    time.value = '60'
    timer.start()
  })
}

const submit = () => {
  if (!isRequired(address.value)) {
    showToast(i18n.global.t('wallet.yourwalletaddress'))
  } else if (!isRequired(password.value)) {
    showToast(i18n.global.t('forget.Pleaseenterpassword'))
  } else {
    const json = {
      address: address.value,
      password: password.value
    }
    proxy.$api.addressUpdate(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('forget.Successfullymodified'))
      goBack()
    })
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
