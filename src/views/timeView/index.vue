<template>
  <div class="timeView">
    <div class="dataList">
      <div class="title-top">
        <router-link class="detail-item" to="/tiemViewList">
          <div class="item-middle">
            {{ $t('task.Check') }}
            <van-icon name="arrow" />
          </div>
        </router-link>
      </div>
      <van-list v-model:loading="isLoading" :finished="isFinished" :finished-text="$t('page.Nodata')" offset="50" @load="getList">
        <div class="user-item" v-for="(item, index) in dataList" :key="index">
          <div class="year-item">
            <div class="year-title">{{ item.year }}</div>
            <div class="month-item" v-for="(itemInfo, indexInfo) in item.list" :key="indexInfo">
              <div class="month-title">{{ moObje[itemInfo.month] }}</div>
              <div class="day-pic">
                <router-link :to="'/timeViewDetail?id=' + itemIs.id" class="img-item" v-for="(itemIs, indexIs) in itemInfo.array" :key="indexIs">
                  <van-image v-if="itemIs.mediaCompress.type == 'image'" width="100%" height="100%" fit="cover" position="center" :src="itemIs.mediaCompress && itemIs.mediaCompress.url" />
                  <video v-else :src="itemIs.mediaCompress && itemIs.mediaCompress.url" controls="true" width="100%" height="100%"></video>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import i18n from '@/i18n/index'
import { storeToRefs } from 'pinia'

const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'timeView'
})
const curLanguage = localStorage.getItem('language') || 'en-US'
const dataList = ref([])
let page = {
  pageSize: 10,
  pageNum: 1,
  type: '1',
  langType: curLanguage
}
const moObje = ref({
  '1': i18n.global.t('timeView.c003'),
  '2': i18n.global.t('timeView.c004'),
  '3': i18n.global.t('timeView.c005'),
  '4': i18n.global.t('timeView.c006'),
  '5': i18n.global.t('timeView.c007'),
  '6': i18n.global.t('timeView.c008'),
  '7': i18n.global.t('timeView.c009'),
  '8': i18n.global.t('timeView.c010'),
  '9': i18n.global.t('timeView.c011'),
  '10': i18n.global.t('timeView.c012'),
  '11': i18n.global.t('timeView.c013'),
  '12': i18n.global.t('timeView.c014')
})
const isLoading = ref(false)
const isFinished = ref(false)
const getList = () => {
  isFinished.value = false
  isLoading.value = true
  proxy.$api
    .toGetShareList(page)
    .then((res: any) => {
      isLoading.value = false
      if (res.code !== 200) {
        isFinished.value = true
        return
      }
      let list = (res.data && res.data.records) || []
      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (!list[i].mediaCompress) list[i].mediaCompress = {}
          if (list[i].videos && Object.keys(list[i].mediaCompress).length === 0) {
            let videos = list[i].videos.split(';')
            list[i].mediaCompress = {
              type: 'video',
              url: videos[0]
            }
          }
        }
      }
      toSetList(list)
      page.pageNum = res.data.current + 1
      if (res.data.size * res.data.current >= res.data.total) {
        isFinished.value = res.data.size * res.data.current >= res.data.total
        page.pageNum = res.data.current
      }
    })
    .catch(() => {
      isLoading.value = false
      isFinished.value = true
    })
}
const toSetList = (arr = []) => {
  for (let index = 0; index < arr.length; index++) {
    let current = arr[index]
    let curIndex = dataList.value.findIndex((item) => item.year == current.year)
    if (curIndex > -1) {
      let mIndex = dataList.value[curIndex].list.findIndex((item) => item.month == current.month)
      if (mIndex > -1) {
        dataList.value[curIndex].list[mIndex].array.push({
          ...current
        })
      } else {
        dataList.value[curIndex].list.push({
          month: current.month,
          array: [
            {
              ...current
            }
          ]
        })
      }
    } else {
      dataList.value.push({
        year: current.year,
        list: [
          {
            month: current.month,
            array: [
              {
                ...current
              }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
