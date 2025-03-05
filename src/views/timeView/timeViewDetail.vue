<template>
  <div class="timeViewDetail">
    <div class="detail-top">
      <div class="back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="title">
        <div class="time">
          {{ detailInfo.createTime }}
        </div>
      </div>
      <div class="size">{{ currentIndex }}/{{ total }}</div>
    </div>
    <div class="detail-content">
      <van-swipe class="my-swipe" id="myS" :show-indicators="false" :loop="false" @change="onChange">
        <van-swipe-item v-for="(item, index) in detailInfo.media" :key="index">
          <img :src="item.url" alt="" v-if="item.type == 'image'" />
          <video v-else :src="item.url" controls="true" width="100%" class="myPreview"></video>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="detail-bottom">
      <router-link class="detail-item" :to="'/tiemViewList?id=' + currentId">
        <div class="detail-txt" v-html="detailInfo.content"></div>
        <div class="item-middle">
          {{ $t('task.Check') }}
          <van-icon name="arrow" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import i18n from '@/i18n/index'
import { useRoute } from 'vue-router'
import router from '@/router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'timeViewDetail'
})
const currentIndex = ref(1)
const total = ref(0)
const route = useRoute()
const currentId = route.query.id
const goBack = () => {
  router.go(-1)
}
const detailInfo = ref<any>({})
const getDetail = () => {
  proxy.$api.toGetShareGet(currentId).then((res: any) => {
    if (res.code == 200) {
      detailInfo.value = res.data || { media: [] }
      if (!detailInfo.value.media) detailInfo.value.media = []
      if (detailInfo.value.videos) {
        let videos = detailInfo.value.videos.split(';')
        for (let i = 0; i < videos.length; i++) {
          detailInfo.value.media.push({
            type: 'video',
            url: videos[i]
          })
        }
      }
      total.value = detailInfo.value.media.length
    }
  })
}
getDetail()
const onChange = (index) => {
  let myPreview = <any>document.querySelectorAll('.myPreview')
  myPreview &&
    myPreview.forEach((element) => {
      element && element.pause && element.pause()
    })

  currentIndex.value = index + 1
}
</script>
<style lang="scss" scoped>
@import './timeViewDetail.scss';
</style>
