<template>
  <div class="personal">
    <div class="pubBg dataList">
      <div class="itemBox">
        <div class="item" v-for="item in obj.list.records">
          <div class="br1">
            <div class="l">
              <div class="p">{{ item.createDateStr }}</div>
              <div class="span">{{ item.createTimeStr }}</div>
            </div>
            <div class="c" v-if="item.type === 0">{{ $t('assets.type0') }}</div>
            <div class="c" v-if="item.type === 1">{{ $t('assets.type1') }}</div>
            <div class="c" v-if="item.type === 2">{{ $t('assets.type2') }}</div>
            <div class="c" v-if="item.type === 3">{{ $t('assets.type3') }}</div>
            <div class="c" v-if="item.type === 4">{{ $t('assets.type4') }}</div>
            <div class="c" v-if="item.type === 5">{{ $t('assets.type5') }}</div>
            <div class="c" v-if="item.type === 6">{{ $t('assets.type6') }}</div>
            <div class="c" v-if="item.type === 7">{{ $t('assets.type7') }}</div>
            <div class="c" v-if="item.type === 8">{{ $t('assets.type8') }}</div>
            <div class="c" v-if="item.type === 9">{{ $t('assets.type9') }}</div>
            <div class="c" v-if="item.type === 10">{{ $t('assets.type10') }}</div>
            <div class="c" v-if="item.type === 11">{{ $t('assets.type11') }}</div>
            <div class="c" v-if="item.type === 12">{{ $t('assets.type12') }}</div>
            <div class="c" v-if="item.type === 13 || item.type === 14">{{ $t('assets.type13') }}</div>
            <div class="c" v-if="item.type === 15">{{ $t('assets.type15') }}</div>
            <div class="c" v-if="item.type === 16">{{ $t('assets.type16') }}</div>
            <div class="c" v-if="item.type === 17">{{ $t('assets.type17') }}</div>
            <div class="c" v-if="item.type === 18 && uiType != 1">{{ $t('assets.type18') }}</div>
            <div class="c2" v-if="item.type === 18 && uiType == 1">
              <div class="p">{{ item.transferToAccount }}</div>
              <div class="span">{{ $t('assets.type18') }}</div>
            </div>
            <div class="c" v-if="item.type === 19 && uiType != 1">{{ $t('assets.type19') }}</div>
            <div class="c2" v-if="item.type === 19 && uiType == 1">
              <div class="p">{{ item.transferOutAccount }}</div>
              <div class="span">{{ $t('assets.type19') }}</div>
            </div>
            <div class="r">
              <div
                class="p"
                v-if="item.type === 0 || item.type === 3 || item.type === 5 || item.type === 6 || item.type === 8 || item.type === 9 || item.type === 10 || item.type === 11 || item.type === 12 || item.type === 13 || item.type === 14 || item.type === 16 || item.type === 17 || item.type === 19"
              >
                +{{ item.amount }}
              </div>
              <div class="p" v-if="item.type === 1 || item.type === 2 || item.type === 4 || item.type === 7 || item.type === 15 || item.type === 18">-{{ item.amount }}</div>
              <div class="span">USDT</div>
            </div>
          </div>
          <div class="br2" v-if="uiType == 1">{{ $t('c2c.d83') }}：{{ item.remark || $t('new.d49') }}</div>
        </div>
      </div>
      <div class="empty" v-if="obj.list.records && obj.list.records.length <= 0">{{ $t('page.Nodata') }}</div>
      <template v-else>
        <div class="more" v-if="isMore" @click="more">{{ $t('page.more') }}</div>
        <div class="empty" v-else>{{ $t('page.final') }}</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_assets'
})

const route = useRoute()
const obj = reactive<any>({
  list: {}
})
const isMore = ref<boolean>(true)
const uiType = ref<number>(0)
let page: any = {
  pageSize: 10,
  pageNum: 1,
  type: route.query.type || null
}
if (page.type) {
  page.type = page.type.split(',')
  if (page.type == '18,19') uiType.value = 1
}
const getList = (type: number) => {
  proxy.$api.walletRecord(page).then((res: any) => {
    if (res.code !== 200) return
    if (type == 1) {
      obj.list = res.data
    } else {
      obj.list.total = res.data.total
      obj.list.records = [...obj.list.records, ...res.data.records]
    }
    if (obj.list.records.length >= res.data.total) isMore.value = false
  })
}
getList(1)
const more = () => {
  if (isMore.value) {
    page.pageNum++
    getList(2)
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
