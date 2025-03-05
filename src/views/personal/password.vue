<template>
  <div class="personal">
    <div class="tab1">
      <div class="item" @click="passwordType = 1">
        <div :class="passwordType == 1 ? 'p cur' : 'p'">{{ $t('new.d15') }}</div>
      </div>
      <div class="item" @click="passwordType = 2">
        <div :class="passwordType == 2 ? 'p cur' : 'p'">{{ $t('new.d16') }}</div>
      </div>
    </div>
    <div class="pubBg">
      <div class="form">
        <div class="item t10" v-if="type == 2">
          <div class="label">{{ $t('personal.Mail') }}</div>
          <div class="span" v-if="email">{{ email }}</div>
          <router-link v-else to="/personal/email">{{ $t('new.d21') }}</router-link>
        </div>
        <div class="item" v-if="type == 2">
          <div class="label">{{ $t('password.E-mailverification') }}</div>
          <div class="right">
            <input type="text" v-model.lazy="code" @input="preventSpaces" :placeholder="$t('personal.Pleaseenter')" />
            <span class="send" v-if="parseInt(time) > 0">{{ time }}S</span>
            <van-loading v-if="loading" />
            <span class="send" v-if="!loading && parseInt(time) <= 0" @click="sendCode">{{ $t('password.Send') }}</span>
          </div>
        </div>
        <div :class="type == 1 ? 'item t10' : 'item'" v-if="(type == 1 && passwordType == 1) || (type == 1 && passwordType == 2 && !noPay)">
          <div class="label">{{ $t('new.d22') }}</div>
          <div class="right">
            <input type="password" autocomplete="off" v-model.lazy="password0" @input="preventSpaces" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div :class="type == 1 && noPay && passwordType == 2 ? 'item t10' : 'item'">
          <div class="label">{{ $t('password.Newpassword') }}</div>
          <div class="right">
            <input type="password" autocomplete="off" v-model.lazy="password" @input="preventSpaces" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('password.Confirmnewpasswordagain') }}</div>
          <div class="right">
            <input type="password" autocomplete="off" v-model.lazy="password2" @input="preventSpaces" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="br2">
          <span v-if="type == 2" @click="typeClick(1)">{{ $t('new.d24') }}</span>
          <span v-if="type == 1" @click="typeClick(2)">{{ $t('new.d25') }}</span>
        </div>
      </div>
    </div>
    <div class="pubBtn bigBtn" @click="submit">{{ $t('password.Sure') }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onUnmounted, watch } from 'vue'
import { Countdown } from '@/utils/common'
import { preventSpaces } from '@/utils/common'
import { isRequired } from '@/utils/validators'
import { showToast } from 'vant'
import { useRoute } from 'vue-router'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_password'
})

const route = useRoute()
const noPay = ref<boolean>(false)
const passwordType = ref<any>(route.query.type || 1) // 1登录密码、2交易密码
const password0 = ref<string>('')
const type = ref<number>(1) // 1原密码、2邮箱
const email = ref<string>('')
const password = ref<string>('')
const password2 = ref<string>('')
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

// 重置表单
watch(passwordType, (newVal, oldVal) => {
  password0.value = ''
  type.value = 1
  password.value = ''
  password2.value = ''
  code.value = ''
  timer.stop()
  time.value = '0'
})

proxy.$api.walletInfo().then((res: any) => {
  if (res.code !== 200) return
  if (!res.data.password) noPay.value = true
})
proxy.$api.userInfo().then((res: any) => {
  if (res.code !== 200) return
  email.value = res.data.email
})
const sendCode = () => {
  if (!email.value) {
    showToast(i18n.global.t('new.d26'))
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

const typeClick = (val: number) => {
  type.value = val
}

const submit = () => {
  if (type.value == 2 && !isRequired(code.value)) {
    showToast(i18n.global.t('forget.pleaseenterverificationcode'))
  } else if (!isRequired(password.value)) {
    showToast(i18n.global.t('forget.Pleaseenterpassword'))
  } else if (!isRequired(password2.value)) {
    showToast(i18n.global.t('forget.Enterpasswordagain'))
  } else if (password.value.length < 6) {
    showToast(i18n.global.t('new.d3'))
  } else if (password.value !== password2.value) {
    showToast(i18n.global.t('forget.Passwordsareinconsistent'))
  } else {
    let json = {}
    if (type.value == 1) {
      if (passwordType.value == 1) {
        json = {
          password: password0.value,
          newPassword: password.value
        }
      }
      if (passwordType.value == 2) {
        if (noPay.value) {
          json = {
            password: password.value
          }
        } else {
          json = {
            oldPassword: password0.value,
            password: password.value
          }
        }
      }
    }
    if (type.value == 2) {
      if (passwordType.value == 1) {
        json = {
          email: email.value,
          newPassword: password.value,
          captcha: code.value
        }
      }
      if (passwordType.value == 2) {
        json = {
          password: password.value,
          code: code.value
        }
      }
    }
    if (passwordType.value == 1) {
      proxy.$api.passwordUpdate(json).then((res: any) => {
        if (res.code !== 200) return
        showToast(i18n.global.t('forget.Successfullymodified'))
        password0.value = ''
        password.value = ''
        password2.value = ''
        code.value = ''
      })
    }

    if (passwordType.value == 2) {
      proxy.$api.payPassword(json).then((res: any) => {
        if (res.code !== 200) return
        noPay.value ? showToast(i18n.global.t('new.d32')) : showToast(i18n.global.t('forget.Successfullymodified'))
        noPay.value = false
        password0.value = ''
        password.value = ''
        password2.value = ''
        code.value = ''
      })
    }
  }
}

// 离开页面清除倒计时
onUnmounted(() => {
  if (timer) timer.stop()
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
