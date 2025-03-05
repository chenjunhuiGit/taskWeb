<template>
  <div class="shopMonth">
    <div class="tit">{{ currentType == '1'? $t('c2c.d184'): $t('c2c.d208')}}</div>
    <div class="ul">
      <div class="li" v-for="item in info">
        <img src="@/assets/icon20.png" />
        <div class="content">
          <p>{{ currentType == '1'? $t('c2c.d185'):$t('c2c.d206') }} {{ item.rewardThreshold }}</p>
          <van-progress v-if="currentType == '1'" :percentage="item.ordersCompleted / item.rewardThreshold > 1 ? 100 : (item.ordersCompleted / item.rewardThreshold) * 100" :show-pivot="false" />
          <van-progress v-else :percentage="item.sellAmount / item.rewardThreshold > 1 ? 100 : (item.sellAmount / item.rewardThreshold) * 100" :show-pivot="false" />
          <div class="p">
            <span>{{ $t('c2c.d186') }} + {{ item.rewardAmount }} USDT</span>
            <span v-if="currentType == '1'">{{ item.ordersCompleted > item.rewardThreshold ? item.rewardThreshold : item.ordersCompleted }}/{{ item.rewardThreshold }}</span>
            <span v-else>{{ item.sellAmount > item.rewardThreshold ? item.rewardThreshold : item.sellAmount }}/{{ item.rewardThreshold }}</span>
          </div>
        </div>
        <div v-if="item.status == 0" class="pubBtn2 dis">{{ $t('c2c.d188') }}</div>
        <div v-if="item.status == 1" class="pubBtn2">{{ $t('c2c.d187') }}</div>
        <div v-if="item.status == 2" class="pubBtn2 dis">{{ $t('c2c.d194') }}</div>
        <div v-if="item.status == 3" class="pubBtn2">{{ $t('c2c.d189') }}</div>
        <div v-if="item.status == 4" class="pubBtn2 red">{{ $t('c2c.d195') }}</div>
      </div>
    </div>
    <div class="btnBox">
      <div v-if="ids.length > 0" class="btn" @click="getRewards">{{ $t('c2c.d190') }}</div>
      <div v-else class="btn dis">{{ $t('c2c.d190') }}</div>
    </div>
    <div class="tips">
      {{ $t('c2c.d191') }} <span>{{currentType == '1'? $t('c2c.d192'): $t('c2c.d207')}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'c2c_shop_month'
})
const route = useRoute()
const currentType = route.query.type
const ids = ref<any>([])
const info = ref<any>([])
const getList = () => {
  ids.value = []
  proxy.$api.monthRewards({type:currentType}).then((res: any) => {
    if (res.code !== 200) return
    info.value = res.data
    for (let i = 0; i < info.value.length; i++) {
      if (info.value[i].status == 1) {
        ids.value.push(info.value[i].id)
      }
    }
  })
}
getList()

const getRewards = () => {
  proxy.$api.claimMonth({ ids: ids.value }).then((res: any) => {
    if (res.code !== 200) return
    showToast(i18n.global.t('c2c.d193'))
    getList()
  })
}

</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
