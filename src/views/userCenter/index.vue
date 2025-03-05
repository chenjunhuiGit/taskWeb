<template>
  <div class="userCenterIndex">
    <div class="bgc-top">
      <router-link to="/userInfo" class="user-top">
        <div class="user-pic">
          <div class="userImg" v-if="userInfo.avatar">
            <img :src="userInfo.avatar" alt="" />
          </div>
          <div class="userImg" v-else>
            <img src="@/assets/user1.png" alt="" />
          </div>
          <!-- <div class="edit-pic">
            <img src="@/assets/icon-edit.png" alt="" >
          </div> -->
        </div>
        <div class="user-name">
          <div class="name" v-if="userInfo.firstName || userInfo.lastName">{{ userInfo.firstName + userInfo.lastName }}</div>
          <div class="name" v-else>{{ userInfo.account }}</div>
          <div class="user-position">
            <span :class="['position-n', 'position-d' + userInfo.level]">{{ getPositon[userInfo.level] }}</span>
            <img src="@/assets/position-user3.svg" v-if="userInfo.level == 3" alt="" />
            <img src="@/assets/position-user4.svg" v-else-if="userInfo.level == 4" alt="" />
            <img src="@/assets/position-user5.svg" v-else-if="userInfo.level == 5" alt="" />
            <img src="@/assets/position-user1.svg" v-else alt="" />
          </div>
        </div>

        <img class="icon-right" src="@/assets/icon_more.png" alt="" />
      </router-link>
      <div class="user-detail">
        <router-link class="detail-item" to="/personal/wallet">
          <div class="item-left">
            <img src="@/assets/Frame.png" alt="" />
          </div>
          <div class="item-middle">
            {{ $t('router.wallet') }}
            <span class="item-right">
              <img src="@/assets/icon-jt-right.png" alt="" />
            </span>
          </div>
        </router-link>
        <router-link to="/personal/identity" class="detail-item">
          <div class="item-left">
            <img src="@/assets/Frame1.png" alt="" />
          </div>
          <div class="item-middle">
            {{ $t('router.identity') }}
            <span class="item-right">
              <span class="item-tip" v-if="userInfo.authStatus == 1">{{ $t('personal.d12') }}</span>
              <span class="item-tip" v-if="userInfo.authStatus == 2">{{ $t('personal.d13') }}</span>
              <span class="item-tip" v-if="userInfo.authStatus == 0 || userInfo.authStatus == 3">{{ $t('personal.d14') }}</span>
              <img src="@/assets/icon-jt-right.png" alt="" />
            </span>
          </div>
        </router-link>
        <router-link to="/personal/password" class="detail-item">
          <div class="item-left">
            <img src="@/assets/Frame2.png" alt="" />
          </div>
          <div class="item-middle">
            {{ $t('userCenter.c02') }}
            <span class="item-right">
              <img src="@/assets/icon-jt-right.png" alt="" />
            </span>
          </div>
        </router-link>
        <router-link :to="userInfo.email ? '#' : '/personal/email'" class="detail-item">
          <div class="item-left">
            <img src="@/assets/Frame3.png" alt="" />
          </div>
          <div class="item-middle">
            {{ $t('personal.Mail') }}
            <span class="item-right">
              <span class="item-tip email-tip" v-if="userInfo.email">{{ userInfo.email }}</span>
              <span v-else class="item-tip">{{ $t('home.Gotoadd') }}</span>
              <img v-if="!userInfo.email" src="@/assets/icon-jt-right.png" alt="" />
            </span>
          </div>
        </router-link>
        <router-link to="/personal/payCard" class="detail-item">
          <div class="item-left">
            <img src="@/assets/Frame4.png" alt="" />
          </div>
          <div class="item-middle">
            {{ $t('c2c.d46') }}
            <span class="item-right">
              <span class="item-tip" v-if="payList.length <= 0">{{ $t('c2c.d101') }}</span>
              <img src="@/assets/icon-jt-right.png" alt="" />
            </span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="user-detail">
      <router-link to="/personal/children" class="detail-item">
        <div class="item-left">
          <img src="@/assets/Frame5.png" alt="" />
        </div>
        <div class="item-middle">
          {{ $t('userCenter.c03') }}
          <span class="item-right">
            <img src="@/assets/icon-jt-right.png" alt="" />
          </span>
        </div>
      </router-link>
      <router-link to="/contract" class="detail-item" v-if="userInfo.contractStatus == 1">
        <div class="item-left">
          <img src="@/assets/Frame6.png" alt="" />
        </div>
        <div class="item-middle">
          {{ $t('userCenter.c04') }}
          <span class="item-right">
            <img src="@/assets/icon-jt-right.png" alt="" />
          </span>
        </div>
      </router-link>
    </div>
    <div class="user-detail">
      <a href="https://t.me/CaptchaExpertCEXP" class="detail-item">
        <div class="item-left">
          <img src="@/assets/Frame9.png" alt="" />
        </div>
        <div class="item-middle">
          Telegram Channel
          <span class="item-right">
            <img src="@/assets/icon-jt-right.png" alt="" />
          </span>
        </div>
      </a>
      <a href="https://t.me/captchaexpert" class="detail-item">
        <div class="item-left">
          <img src="@/assets/Frame7.png" alt="" />
        </div>
        <div class="item-middle">
          {{ $t('router.customer') }}
          <span class="item-right">
            <img src="@/assets/icon-jt-right.png" alt="" />
          </span>
        </div>
      </a>
      <router-link to="/personal/customer" class="detail-item">
        <div class="item-left">
          <img src="@/assets/Frame8.png" alt="" />
        </div>
        <div class="item-middle">
          {{ $t('customer.d4') }}
          <span class="item-right">
            <img src="@/assets/icon-jt-right.png" alt="" />
          </span>
        </div>
      </router-link>
    </div>

    <div class="loginOutBtn" @click="signOut">{{ $t('userCenter.c05') }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { SwipeInstance, showDialog } from 'vant'
import { useRoute } from 'vue-router'
import i18n from '@/i18n/index'
import { storeToRefs } from 'pinia'
import Cookies from 'js-cookie'
import { useCounterStore } from '@/store/useCounterStore'
import { showToast } from 'vant'
import router from '@/router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'userCenterIndex'
})
const userStore = useCounterStore()
const { getPositon } = storeToRefs(userStore)
const userInfo = ref<any>({ nickName: '', level: 0, avatar: '', email: ' ' })
const payList = ref<any>([1])
proxy.$api.userInfo().then((res: any) => {
  if (res.code !== 200) return
  userInfo.value = res.data
  // userInfo.value.level =2
})
proxy.$api.tradeAccountList().then((res: any) => {
  if (res.code !== 200) return
  payList.value = res.data
})

const signOut = () => {
  proxy.$api.signOut().then((res: any) => {
    if (res.code !== 200) return
    showToast(i18n.global.t('router.Quit'))
    Cookies.remove('token')
    router.push('/login')
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
