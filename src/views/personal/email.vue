<template>
  <div class="personal">
    <div class="pubBg">
      <div class="form">
        <div class="item">
          <div class="label">{{ $t('personal.Mail') }}</div>
          <div class="right">
            <input type="text" v-model.lazy="email" @input="preventSpaces" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('password.E-mailverification') }}</div>
          <div class="right">
            <input type="text" v-model.lazy="code" @input="preventSpaces" :placeholder="$t('personal.Pleaseenter')" />
            <span class="send" v-if="parseInt(time) > 0">{{ time }}S</span>
            <van-loading v-if="loading" />
            <span class="send" v-if="!loading && parseInt(time) <= 0" @click="sendCode">{{ $t('password.Send') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pubBtn bigBtn" @click="submit">{{ $t('password.Sure') }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Countdown } from '@/utils/common'
import { preventSpaces } from '@/utils/common'
import { isRequired, isEmail } from '@/utils/validators'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_email'
})

const router = useRouter()
const goBack = () => {
  router.go(-1)
}

const email = ref<string>('')
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
  } else {
    const json = {
      email: email.value,
      code: code.value
    }
    proxy.$api.emailBind(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('new.d19'))
      // router.push('/login')
      goBack()
    })
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
