<template>
  <div class="personal_children">
    <div class="children-top">
      <div class="user-detail">
        <div class="detail-position" v-show="getPositon[userInfo.level]">{{getPositon[userInfo.level]}}</div>
        <div class="detail-top">
          <div class="userImg" v-if="userInfo.avatar">
            <img :src="userInfo.avatar" alt="">
          </div>
          <div class="userImg" v-else>
            <img src="@/assets/user1.png" alt="">
          </div>
          <div class="detail-name">
            <div class="name" v-if="userInfo.firstName || userInfo.lastName">{{ userInfo.firstName + userInfo.lastName }}</div>
            <div class="name" v-else>{{ userInfo.account }}</div>
            <div class="id-card">{{userInfo.phone||''}}</div>
          </div>
        </div>
        <div class="detail-line"></div>
        <div class="detail-bottom">
          <div class="detail-bo-left">
            <div class="detail-n">{{userInfo.taskName||$t('position.s94')}}</div>
            <div class="detail-s">{{$t('position.c003')}}</div>
          </div>
          <div class="detail-bo-right">
            <div class="detail-n">{{(userInfo.answerRightRate||0)+'%'}}</div>
            <div class="detail-s">{{$t('position.c088')}}</div>
          </div>
        </div>
      </div>
      <div class="user-leve">
        <div class="leve-top">
          <div class="leve-top-item" @click="toCopyText(userInfo.parentPhone)">
            <div class="leve-titl">{{$t('position.c089')}}</div>
            <div class="leve-txt">
              {{ userInfo.parentPhone||'' }}
              <img class="copy-icon" src="@/assets/icon-copy.png" />
            </div>
          </div>
          <div class="leve-line"></div>
          <div class="leve-top-item" @click="toCopyText(userInfo.inviteCode)">
            <div class="leve-titl">{{$t('position.c090')}}</div>
            <div class="leve-txt">
              {{ userInfo.inviteCode }}
              <img class="copy-icon" src="@/assets/icon-copy.png" />
            </div>
          </div>
        </div>
        <div class="leve-btom" @click="toCopyText(toShareLink+userInfo.inviteCode)">
          {{ toShareLink+userInfo.inviteCode }}
        </div>
      </div>
    </div>
    <div class="tem-box">
      <router-link class="team"  to="/personal/teams">
          <div class="team-left">
            <img  v-for="(item,index) in temList" :key="index" :src="item.url" alt="">
          </div>
          <div class="team-right">
            <span class="right-txt">{{ $t('router.teams') }}</span>
            <img src="@/assets/icon-jt.png" alt="">
          </div>
      </router-link>
      <router-link class="team"  to="/teamCommission">
          <div class="team-left">
            <img   src="@/assets/position-left.png" alt="">
          </div>
          <div class="team-right">
            <span class="right-txt">{{ $t('new.d53') }}</span>
            <img src="@/assets/icon-jt.png" alt="">
          </div>
      </router-link>
    </div>
    <van-swipe class="my-swipe" id="myS"   :loop='false'    indicator-color="#438cff">
      <van-swipe-item >
    <div class="first-children">
      <div class="chd-title">
        <div class="chd-left">{{$t('position.c091')}}</div>
        <div class="chd-right">{{ userInfo.directCount||0 }}</div>
      </div>
      <div class="chd-total">
          <div :class="['chd-item','chd'+(index+1)%4]" v-for="(value,key,index) in userInfo.directChildMap" :key="index">
            <div class="chd-item-title">{{key.toString()=='未激活的'?$t('position.s93'):key}}</div>
            <div class="chd-num">{{value||0}}</div>
          </div>
          <div class="empty" v-if="Object.keys(userInfo.directChildMap || {}).length <= 0">{{ $t('page.Nodata') }}</div>
          
      </div>
    </div>
      </van-swipe-item>
      <van-swipe-item >
    <div class="first-children">
      <div class="chd-title">
        <div class="chd-left">{{$t('position.c092')}}</div>
        <div class="chd-right">{{ userInfo.indirectCount || 0 }}</div>
      </div>
      <div class="chd-total">
          <div :class="['chd-item','chd'+(index+1)%4]"  v-for="(value,key,index) in userInfo.indirectChildMap" :key="index">
            <div class="chd-item-title">{{key.toString()=='未激活的'?$t('position.s93'):key}}</div>
            <div class="chd-num">{{value||0}}</div>
          </div>
          <div class="empty" v-if="Object.keys(userInfo.indirectChildMap || {}).length <= 0">{{ $t('page.Nodata') }}</div>
      </div>
    </div>
      </van-swipe-item>
    </van-swipe>
    
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance,computed } from 'vue'
import { showToast } from 'vant'
import { clipboard } from '@/utils/common'
import { useCounterStore } from '@/store/useCounterStore'
import { storeToRefs } from 'pinia'
import i18n from '@/i18n/index'
 
const userStore = useCounterStore()
const { getPositon } =  storeToRefs(userStore)
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_children'
})
const temList = ref([
  {url:new URL('../../assets/people1.png', import.meta.url).href},
  {url:new URL('../../assets/people2.png', import.meta.url).href},
  {url:new URL('../../assets/people3.png', import.meta.url).href},
  {url:new URL('../../assets/people4.png', import.meta.url).href},
  {url:new URL('../../assets/people5.png', import.meta.url).href},
  {url:new URL('../../assets/people6.png', import.meta.url).href}
])
const userInfo = ref<any>({})
const toShareLink = ref(null)
toShareLink.value= window.location.origin + '/#/register?inviteCode='
const toCopyText=(text:string|Number)=>{
    text = text||''
    clipboard(text) ? showToast(i18n.global.t('home.Copiedsuccessfully')) : showToast(i18n.global.t('home.Copyfailed'))
}
const getUserInfo = () => {
  proxy.$api.myteam().then((res: any) => {
      if(res.code==200){
        userInfo.value = res.data||{}
        userInfo.value.directChildMap= userInfo.value.directChildMap||{}
        userInfo.value.indirectChildMap= userInfo.value.indirectChildMap||{}
        userInfo.value.inviteCode = userInfo.value.inviteCode||''
      }
  })
}

getUserInfo()
</script>
<style lang="scss" scoped>
@import './children.scss';
</style>
