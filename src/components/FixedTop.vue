<template>
  <div class="fixedTop2" v-if="!showHeader && !['task_working', 'login', 'register', 'forget', 'timeViewDetail'].includes(routeName)">
    <div class="back">
      <van-icon name="arrow-left" @click="goBack" />
      <span v-if="routeI18nKey">{{ $t(routeI18nKey) }}</span>
    </div>
  </div>
  <Language v-if="!showHeader && !['task_working', 'login', 'register', 'forget', 'position', 'article_info', 'timeViewDetail', 'tiemViewList'].includes(routeName)" />

  <div class="fixedTop" v-if="showHeader">
    <div class="topBar">
      <img src="@/assets/logo2.png" />
      <div class="right">
        <router-link to="/position">{{ $t('router.Position') }}</router-link>
        <router-link to="/userCenter">{{ $t('router.PersonalCenter') }}</router-link>
        <!-- <span @click="signOut">{{ $t('router.Quit') }}</span> -->
      </div>
    </div>
    <div class="topNav">
      <div :class="routeName == 'home' ? 'item cur' : 'item'">
        <router-link to="/">{{ $t('router.Home') }}</router-link>
      </div>
      <div :class="routeName == 'task' ? 'item cur' : 'item'">
        <router-link to="/task">{{ $t('router.Task') }}</router-link>
      </div>
      <div :class="routeName == 'c2c' ? 'item cur' : 'item'">
        <router-link to="/c2c">P2P</router-link>
      </div>
      <div :class="routeName == 'timeView' ? 'item cur' : 'item'">
        <router-link to="/timeView">{{ $t('router.Moment') }}</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import router from '@/router'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()

const route = useRoute()
const showHeader = ref<any>(false)
const routeName = ref<any>('')
const routeI18nKey = ref<any>('')
showHeader.value = route.meta.hasHeader
routeName.value = route.name
routeI18nKey.value = route.meta.i18nKey

watch(route, (newVal, oldVal) => {
  showHeader.value = route.meta.hasHeader
  routeName.value = route.name
  routeI18nKey.value = route.meta.i18nKey
  if (newVal.fullPath == '/personal/assets?type=6,10') {
    document.title = i18n.global.t('wallet.d12')
    routeI18nKey.value = 'wallet.d12'
  }
  if (newVal.fullPath == '/personal/assets?type=2,7') {
    document.title = i18n.global.t('wallet.d13')
    routeI18nKey.value = 'wallet.d13'
  }
  if (newVal.fullPath == '/personal/assets?type=18,19') {
    document.title = i18n.global.t('new.d46')
    routeI18nKey.value = 'new.d46'
  }
})

const signOut = () => {
  proxy.$api.signOut().then((res: any) => {
    if (res.code !== 200) return
    showToast(i18n.global.t('router.Quit'))
    Cookies.remove('token')
    router.push('/login')
  })
}

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.fixedTop {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 50%;
  width: 750px;
  transform: translateX(-50%);
  padding-bottom: 20px;
  .topBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    background: #5f9afd;
    padding: 16px 30px;
    img {
      width: 180px;
    }
    .right {
      display: flex;
      a {
        display: inline-block;
        margin-right: 30px;
        color: #fff;
        &:last-child {
          margin-right: 0;
        }
      }
      span {
        color: #fff;
      }
    }
  }
  .topNav {
    display: flex;
    background: #5f9afd;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 34px;
      padding: 10px 0;
      a {
        display: inline-block;
        color: rgba(255, 255, 255, 0.66);
      }

      &.cur {
        a {
          color: #fff;
          padding: 12px 0 24px;
          position: relative;
          &::after {
            content: ' ';
            width: 100%;
            position: absolute;
            bottom: 10px;
            left: 0;
            border-radius: 3px;
            border-bottom: 6px solid #fff;
          }
        }
      }
    }
  }
}

.fixedTop2 {
  z-index: 8;
  position: fixed;
  top: 0;
  left: 50%;
  width: 750px;
  transform: translateX(-50%);
  padding-bottom: 20px;
  background: linear-gradient(180deg, #5f9afd 0%, #81b0fd 100%);
  .back {
    padding: 30px 30px 0;
    font-size: 36px;
    color: #fff;
    span {
      margin-left: 20px;
    }
  }
}
</style>
