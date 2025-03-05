<template>
  <div class="login">
    <div class="card two">
      <Language />
      <div class="title">
        <img src="@/assets/logo3.png" />
        <div class="p1">{{ $t('register.Register') }}</div>
      </div>
      <div class="form">
        <!-- <div class="inputBg input">
          <img src="@/assets/icon02.png" />
          <input type="text" v-model.lazy="email" @input="preventSpaces" :placeholder="$t('forget.pleaseinputyouremail')" />
        </div>
        <div class="inputBg input">
          <img src="@/assets/icon03.png" />
          <input type="text" v-model.lazy="code" @input="preventSpaces" :placeholder="$t('forget.pleaseenterverificationcode')" />
          <span v-if="parseInt(time) > 0">{{ time }}S</span>
          <van-loading v-if="loading" />
          <span v-if="!loading && parseInt(time) <= 0" @click="sendCode">{{ $t('forget.Sendtheverificationcode') }}</span>
        </div> -->
        <div class="inputBg phone">
          <div class="code" @click="areaShow">
            <span v-if="zone">+{{ zone }}</span>
            <span v-else>{{ $t('new.d27') }}</span>
            <van-icon name="play" class="icon" />
          </div>
          <div class="input">
            <input type="text" v-model.lazy="phone" @input="number0_9" :placeholder="$t('register.phone')" />
          </div>
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
        <div class="inputBg input">
          <img src="@/assets/icon04.png" />
          <input type="text" :disabled="disabled" v-model.lazy="inviteCode" @input="preventSpaces" :placeholder="$t('register.EnterID')" />
        </div>
      </div>
      <div class="p">
        <span>
          {{ $t('register.haveaccount') }}<router-link to="/login">{{ $t('register.Gotologin') }}</router-link>
        </span>
      </div>
      <div class="check">
        <van-checkbox v-model="checked">{{ $t('register.Iaccept') }}</van-checkbox>
        <router-link to="/article/info?type=6">{{ $t('register.TermsofService') }}</router-link>
        {{ $t('register.and') }}<router-link to="/article/info?type=7">{{ $t('register.privacyagreement') }}</router-link>
      </div>
    </div>
    <div class="btn" @click="signUp">{{ $t('register.Register') }}</div>

    <van-popup v-model:show="showArea" :style="{ height: '80%' }" closeable close-icon="close" round position="bottom">
      <div class="phoneArea">
        <div class="tit">{{ $t('register.zone2') }}</div>
        <input type="text" v-model="searchKey" @input="search" :placeholder="$t('new.d2')" />
        <div class="list">
          <div :class="zone == item.code ? 'item cur' : 'item'" v-for="item in areaList" @click="areaClick(item.code)">
            <div class="name">{{ item.name }}</div>
            <div class="code">+{{ item.code }}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { preventSpaces, Countdown, number0_9 } from '@/utils/common'
import { isRequired, isEmail, isStrongPassword } from '@/utils/validators'
import { areaCode, searchItems } from '@/utils/areaCode'
import router from '@/router'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'register'
})

const showArea = ref<boolean>(false)
const areaList = ref<any>([])
const searchKey = ref<string>('')
areaList.value = areaCode
const search = () => {
  if (searchKey.value) {
    areaList.value = searchItems(searchKey.value)
  } else {
    areaList.value = areaCode
  }
}
const areaShow = () => {
  showArea.value = true
}
const areaClick = (val: string) => {
  showArea.value = false
  zone.value = val
}

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
const email = ref<string>('')
const password = ref<string>('')
const password2 = ref<string>('')
const code = ref<string>('')
const inviteCode = ref<string>('')
const zone = ref<string>('251')
const phone = ref<string>('')
const checked = ref<boolean>(true)
const route = useRoute()
const disabled = ref<boolean>(false)
const loading = ref<boolean>(false)
if (route.query.inviteCode) {
  disabled.value = true
  inviteCode.value = route.query.inviteCode as string
}
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
const signUp = () => {
  if (!isRequired(zone.value)) {
    showToast(i18n.global.t('register.zone'))
  } else if (!isRequired(phone.value)) {
    showToast(i18n.global.t('register.phone'))
  } else if (!isRequired(password.value)) {
    showToast(i18n.global.t('forget.Pleaseenterpassword'))
  } else if (!isRequired(password2.value)) {
    showToast(i18n.global.t('forget.Enterpasswordagain'))
  } else if (password.value.length < 6) {
    showToast(i18n.global.t('new.d3'))
  } else if (password.value !== password2.value) {
    showToast(i18n.global.t('forget.Passwordsareinconsistent'))
  } else if (!isRequired(inviteCode.value)) {
    showToast(i18n.global.t('register.EnterID'))
  } else if (!checked.value) {
    showToast(i18n.global.t('register.Pleaseagree'))
  } else {
    const json = {
      // email: email.value,
      password: password.value,
      // code: code.value,
      zone: zone.value,
      phone: phone.value,
      inviteCode: inviteCode.value
    }
    proxy.$api.signUp(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('register.Registrationsuccess'))
      router.push('/login')
    })
  }
}

const eyeShow = ref<boolean>(false)
const eyeClick = () => {
  eyeShow.value = !eyeShow.value
}
const eyeShow2 = ref<boolean>(false)
const eyeClick2 = () => {
  eyeShow2.value = !eyeShow2.value
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
