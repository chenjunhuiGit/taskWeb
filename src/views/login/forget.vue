<template>
  <div class="login">
    <div class="card">
      <Language />
      <div class="title">
        <img src="@/assets/logo3.png" />
        <div class="p1">{{ $t('forget.forgetthepassword') }}</div>
      </div>
      <div class="form">
        <div class="inputBg input">
          <img src="@/assets/icon02.png" />
          <input type="text" v-model.lazy="email" @input="preventSpaces" :placeholder="$t('forget.pleaseinputyouremail')" />
        </div>
        <div class="inputBg input">
          <img src="@/assets/icon03.png" />
          <input type="text" v-model.lazy="code" @input="preventSpaces" :placeholder="$t('forget.pleaseenterverificationcode')" />
          <span v-if="parseInt(time) > 0">{{ time }}S</span>
          <van-loading v-if="loading" />
          <span v-if="!loading && parseInt(time) <= 0" @click="sendCode">{{ $t('forget.Sendtheverificationcode') }}</span>
        </div>
        <div class="inputBg input">
          <img src="@/assets/icon01.png" />
          <input :type="eyeShow ? 'text' : 'password'" v-model.lazy="password" @input="preventSpaces" :placeholder="$t('forget.Pleaseenterpassword')" />
          <van-icon :name="eyeShow ? 'eye-o' : 'closed-eye'" color="#999" @click="eyeClick" />
        </div>
        <div class="inputBg input">
          <img src="@/assets/icon01.png" />
          <input :type="eyeShow2 ? 'text' : 'password'" v-model.lazy="password2" @input="preventSpaces" :placeholder="$t('forget.Enterpasswordagain')" />
          <van-icon :name="eyeShow2 ? 'eye-o' : 'closed-eye'" color="#999" @click="eyeClick2" />
        </div>
      </div>
      <div class="p">
        <span>
          <router-link to="/login">{{ $t('forget.Returntologin') }}</router-link>
        </span>
        <div class="a">
          {{ $t('new.d4') }}<a href="https://t.me/captchaexpert">{{ $t('personal.ContactCustomerService') }}</a>
        </div>
      </div>
    </div>
    <div class="btn" @click="submit">{{ $t('forget.submit') }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { Countdown } from '@/utils/common'
import { preventSpaces } from '@/utils/common'
import { isRequired, isEmail, isStrongPassword } from '@/utils/validators'
import { showToast } from 'vant'
import router from '@/router'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'forget'
})

const eyeShow = ref<boolean>(false)
const eyeClick = () => {
  eyeShow.value = !eyeShow.value
}
const eyeShow2 = ref<boolean>(false)
const eyeClick2 = () => {
  eyeShow2.value = !eyeShow2.value
}

const email = ref<string>('')
const password = ref<string>('')
const password2 = ref<string>('')
const code = ref<string>('')
const loading = ref<boolean>(false)
const time = ref<any>('0')
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
  if (!isRequired(email.value)) {
    showToast(i18n.global.t('forget.pleaseinputyouremail'))
  } else if (!isEmail(email.value)) {
    showToast(i18n.global.t('forget.pleaseenteravalidemailaddress'))
  } else {
    loading.value = true
    proxy.$api.sendCode(email.value).then((res: any) => {
      loading.value = false
      if (res.code !== 200) return
      showToast(i18n.global.t('forget.Sentsuccessfully'))
      time.value = '60'
      timer.start()
    })
  }
}
const submit = () => {
  if (!isRequired(email.value)) {
    showToast(i18n.global.t('forget.pleaseinputyouremail'))
  } else if (!isRequired(code.value)) {
    showToast(i18n.global.t('forget.pleaseenterverificationcode'))
  } else if (!isRequired(password.value)) {
    showToast(i18n.global.t('forget.Pleaseenterpassword'))
  } else if (!isRequired(password2.value)) {
    showToast(i18n.global.t('forget.Enterpasswordagain'))
  } else if (!isEmail(email.value)) {
    showToast(i18n.global.t('forget.pleaseenteravalidemailaddress'))
  } else if (password.value.length < 6) {
    showToast(i18n.global.t('new.d3'))
  } else if (password.value !== password2.value) {
    showToast(i18n.global.t('forget.Passwordsareinconsistent'))
  } else {
    const json = {
      isLog: false,
      email: email.value,
      newPassword: password.value,
      captcha: code.value
    }
    proxy.$api.passwordUpdate(json).then((res: any) => {
      if (res.code !== 200) return
      showToast({
        message: i18n.global.t('forget.Successfullymodified'),
        onClose: () => {
          router.push('/login')
        }
      })
    })
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
