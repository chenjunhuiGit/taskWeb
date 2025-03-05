<template>
  <div class="article">
    <div class="pubBg list">
      <div class="item" v-for="item in list">
        <div class="br">
          <img v-if="item.image && item.image.indexOf('https') > -1" :src="item.image" alt="" />
          <img v-else :src="item.image" alt="" />
          <span>{{ item.title }}</span>
        </div>
        <div class="br2">
          <span>{{ $t('article.releasetime') }}：{{ item.createTime }}</span>
          <span @click="goInfo(item)">{{ $t('article.checkthedetails') }}</span>
        </div>
      </div>
      <div class="empty" v-if="list.length <= 0">{{ $t('page.Nodata') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import router from '@/router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'article_list'
})

const list = ref<any>([])
const getList = () => {
  const json = {
    lang: localStorage.getItem('language') || 'zh-CN',
    type: 5
  }
  proxy.$api.articleList(json).then((res: any) => {
    if (res.code !== 200) return
    list.value = res.data
  })
}
getList()

const goInfo = (item: any) => {
  router.push('/article/info')
  localStorage.setItem('detail', item.content)
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
