<template>
  <div class="article info">
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'article_info'
})

const router = useRouter()
const goBack = () => {
  router.go(-1)
}

const route = useRoute()
let type = route.query.type

const content = ref<any>()
if (type) {
  const json = {
    lang: localStorage.getItem('language') || 'zh-CN',
    type: type
  }
  proxy.$api.articleList(json).then((res: any) => {
    if (res.code !== 200) return
    content.value = res.data[0].content
  })
} else {
  let detail = localStorage.getItem('detail')
  content.value = detail
}
</script>
<style lang="scss">
@import './index.scss';
</style>
