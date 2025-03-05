<template>
  <div class="tiemViewList">
    <div class="content" ref="content">
      <div class="obDom" ref="preDom"></div>
      <div class="content-box">
        <div class="item" v-for="(item, index) in dataList" :key="index" :id="'current' + item.id">
          <div class="item-title" v-html="item.content"></div>
          <div :class="['items-pic', item.media.length > 1 ? 'three' : '']">
            <div class="pic" v-for="(itemInfo, indexInfo) in item.media" :key="indexInfo">
              <van-image @click="toShowImg(item.media, indexInfo)" class="pic-img" fit="cover" position="center" :src="itemInfo.url" v-if="itemInfo.type == 'image'" />
              <div @click="toShowImg(item.media, indexInfo)" style="width: 100%; height: 100%" v-else>
                <video :src="itemInfo.url" controls="true" width="100%" height="100%"></video>
              </div>
            </div>
          </div>
          <div class="item-time">{{ item.createTime }}</div>
        </div>
      </div>
      <div class="empty" v-if="dataList.length <= 0">{{ $t('page.Nodata') }}</div>
      <div class="obDom" ref="nextDom"></div>
    </div>
    <van-image-preview class="myPreview" v-if="show" v-model:show="show" :images="imgPrevList" :showIndex="false" :overlayStyle="{ background:'#000'}" showIndicators :close-on-click-image="false" :startPosition="startPosition" @change="tochange">
      <template #image="{ src, style, onLoad }">
        <video style="width: 100%" controls v-if="isVideo(src)" class="myPreview">
          <source :src="src" />
        </video>
        <img v-else :src="src" :style="[{ width: '100%' }, style]" @load="onLoad" />
      </template>
    </van-image-preview>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'tiemViewList'
})
const route = useRoute()
const currentId = route.query.id
const show = ref(false)
const imgPrevList = ref([])
const imgPrevListCopy = ref([])
const curLanguage = localStorage.getItem('language') || 'en-US'
const dataList = ref([])
const startPosition = ref(0)

let page = {
  pageSize: 10,
  pageNum: 1,
  type: '1',
  langType: curLanguage,
  id: ''
}

const pageNumList = ref([])
const isLoading = ref(false)
const isNextFinished = ref(false)
const isFirstFinished = ref(false)
const getList = (isNext, id) => {
  isNextFinished.value = false
  isFirstFinished.value = false
  isLoading.value = true
  let params = { ...page }
  if (id) {
    params.id = id
    delete params.pageNum
  }
  proxy.$api
    .toGetShareListById(params)
    .then((res: any) => {
      isLoading.value = false
      if (res.code !== 200) {
        isNextFinished.value = false
        isFirstFinished.value = false
        return
      }
      let list = (res.data && res.data.records) || []
      for (let i = 0; i < list.length; i++) {
        if (!list[i].media) list[i].media = []
        if (list[i].videos) {
          let videos = list[i].videos.split(';')
          for (let i2 = 0; i2 < videos.length; i2++) {
            list[i].media.push({
              type: 'video',
              url: videos[i2]
            })
          }
        }
      }
      if (res.data.current == 1) {
        isFirstFinished.value = true
      }
      page.pageNum = res.data.current
      pageNumList.value.push(res.data.current)
      if (isNext) {
        dataList.value.push(...list)
      } else {
        dataList.value.unshift(...list)
      }
      if (id) {
        proxy.$nextTick(() => {
          const container = document.getElementById('current' + id)
          if (container) {
            container.scrollIntoView()
          }
        })
      }
      if (res.data.size * res.data.current >= res.data.total) {
        isNextFinished.value = res.data.size * res.data.current >= res.data.total
        page.pageNum = res.data.current
      }
    })
    .catch(() => {
      isLoading.value = false
      isNextFinished.value = true
      isFirstFinished.value = true
    })
}
const preDom = ref(null)
const nextDom = ref(null)
const content = ref(null)
onMounted(() => {
  const ob = new IntersectionObserver(
    (list) => {
      let pre = list[0]
      if (isLoading.value) {
        return
      }
      if (pre && pre.target == preDom.value && pre.isIntersecting && !isFirstFinished.value) {
        // 上一个交叉了 调用上一页
        let min = Math.min(...pageNumList.value)
        if (min == 1) return
        page.pageNum = min - 1
        getList(false, null)
        return
      }
      if (pre && pre.target == nextDom.value && pre.isIntersecting && !isNextFinished.value) {
        // 下一个交叉了 调用下一页
        let max = Math.max(...pageNumList.value)
        page.pageNum = max + 1
        getList(true, null)
      }
    },
    {
      root: content.value, // 重叠的父元素，默认视口
      threshold: 0.5 // 阀值
    }
  )

  ob.observe(preDom.value)
  ob.observe(nextDom.value)
})

const toShowImg = (imgList, index) => {
  imgPrevListCopy.value = imgList
  let imgArr = []
  startPosition.value = index
  imgList.map((item) => {
    imgArr.push(item.url)
  })
  show.value = true
  imgPrevList.value = imgArr
}
if (currentId) {
  getList(false, currentId)
} else {
  getList(false, null)
}
const isVideo = (src) => {
  let index = imgPrevListCopy.value.findIndex((item) => item.url == src)
  if (index < 0) return false
  return !(imgPrevListCopy.value[index].type == 'image')
}
const tochange = (index) => {
  let myPreview = <any>document.querySelectorAll('.myPreview')
  myPreview &&
    myPreview.forEach((element) => {
      element && element.pause && element.pause()
    })
}
</script>
<style lang="scss" scoped>
@import './tiemViewList.scss';
</style>
