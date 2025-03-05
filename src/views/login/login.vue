<template>
  <div class="login">
    <div class="card">
      <Language />
      <img src="@/assets/img1.png" />
      <div class="title">
        <img src="@/assets/logo3.png" />
        <div class="p1">{{ $t('login.Login') }}</div>
      </div>
      <div class="topspan">{{ $t('new.d1', { name: 'CaptchaExpert' }) }}</div>
      <div class="form">
        <div class="inputBg phone" v-if="!isEmail">
          <div class="code" @click="areaShow">
            <span v-if="zone">+{{ zone }}</span>
            <span v-else>{{ $t('new.d27') }}</span>
            <van-icon name="play" class="icon" />
          </div>
          <div class="input">
            <input type="text" v-model.lazy="phone" @input="preventSpaces" :placeholder="$t('register.phone')" />
          </div>
        </div>
        <div v-else class="inputBg input" style="padding-left: 10px">
          <input type="text" v-model.lazy="email" @input="preventSpaces" :placeholder="$t('forget.pleaseinputyouremail')" />
        </div>
        <div class="inputBg input">
          <img src="@/assets/icon01.png" />
          <input :type="eyeShow ? 'text' : 'password'" @input="preventSpaces" v-model.lazy="password" :placeholder="$t('forget.Pleaseenterpassword')" />
          <van-icon :name="eyeShow ? 'eye-o' : 'closed-eye'" color="#999" @click="eyeClick" />
        </div>
      </div>
      <div class="p">
        <span>
          {{ $t('login.Don’thave') }}<router-link to="/register">{{ $t('login.Signup') }}</router-link>
        </span>
        <div class="a">
          <router-link to="/forget">{{ $t('login.Forgetthepassword') }}</router-link>
        </div>
        <div class="a">
          <a href="javascript:void(0)" v-if="!isEmail" @click="isEmail = true">{{ $t('login.email') }}</a>
          <a href="javascript:void(0)" v-else @click="isEmail = false">{{ $t('login.phone') }}</a>
        </div>
      </div>
    </div>
    <div class="btn" v-if="!isEmail" @click="login">{{ $t('login.Login') }}</div>
    <div class="btn" v-else @click="login2">{{ $t('login.Login') }}</div>

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
import { preventSpaces } from '@/utils/common'
import { isRequired } from '@/utils/validators'
import { areaCode, searchItems } from '@/utils/areaCode'
const { proxy }: any = getCurrentInstance()
import Cookies from 'js-cookie'
import router from '@/router'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
defineOptions({
  name: 'login'
})

const eyeShow = ref<boolean>(false)
const eyeClick = () => {
  eyeShow.value = !eyeShow.value
}

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

const isEmail = ref<boolean>(false)
const email = ref<string>('')

const zone = ref<string>('251')
const phone = ref<string>('')
const password = ref<string>('')
const login = () => {
  if (!isRequired(zone.value)) {
    showToast(i18n.global.t('register.zone'))
  } else if (!isRequired(phone.value)) {
    showToast(i18n.global.t('register.phone'))
  } else if (!isRequired(password.value)) {
    showToast(i18n.global.t('forget.Pleaseenterpassword'))
  } else {
    let json = {
      zone: zone.value,
      phone: phone.value,
      password: password.value
    }

    proxy.$api.signIn(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('login.Loginsuccessful'))
      const data = res.data
      Cookies.set('token', data.token)
      // if (!data.passGuide) {
      //   router.push('/task/working?type=1')
      // } else {
      router.push('/')
      // }
    })
  }
}

const login2 = () => {
  if (!isRequired(email.value)) {
    showToast(i18n.global.t('forget.pleaseinputyouremail'))
  } else if (!isRequired(password.value)) {
    showToast(i18n.global.t('forget.Pleaseenterpassword'))
  } else {
    let json = {
      email: email.value,
      password: password.value
    }

    proxy.$api.signIn2(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('login.Loginsuccessful'))
      const data = res.data
      Cookies.set('token', data.token)
      // if (!data.passGuide) {
      //   router.push('/task/working?type=1')
      // } else {
      router.push('/')
      // }
    })
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
