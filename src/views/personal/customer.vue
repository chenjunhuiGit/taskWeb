<template>
  <div class="personal">
    <div class="customer">
      <div class="left">
        <div class="p">{{ $t('customer.d2') }}</div>
        <a href="https://t.me/captchaexpert" class="pubBtn">{{ $t('customer.d3') }}<van-icon name="arrow" /></a>
      </div>
      <img src="@/assets/icon10.png" />
    </div>
    <div class="question">
      <div class="line"></div>
      <div class="pubBg">
        <div class="tit">{{ $t('customer.d4') }}</div>
        <div class="list0">
          <div :class="item.isOpen ? 'item open' : 'item'" v-for="item in list" @click="item.isOpen = !item.isOpen">
            <div class="t">
              <span>{{ item.title }}</span>
              <van-icon :name="item.isOpen ? 'arrow-down' : 'arrow-left'" />
            </div>
            <div class="pre" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_customer'
})

const list = ref<any>([])
const getList = () => {
  const json = {
    lang: localStorage.getItem('language') || 'zh-CN',
    type: 4
  }
  proxy.$api.articleList(json).then((res: any) => {
    if (res.code !== 200) return
    list.value = res.data
  })
}
getList()
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
