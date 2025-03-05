<template>
  <div class="teamCommission">
    <div class="dataList">
      <div class="tab-top">
        <div class="tab">
          <div :class="['item',status == 8 ? 'cur':'']" @click="tabClick(8)"><span>{{ $t('new.d54') }}</span></div>
          <div :class="['item',status == 9 ? 'cur':'']" @click="tabClick(9)"><span>{{ $t('new.d55') }}</span></div>
        </div>
      </div>      
    <van-list
        v-model:loading="isLoading"
        :finished="isFinished"
        :finished-text="$t('page.Nodata')"
        offset="50"
        @load="getList"
        class="list-box"
        >
        <div class="user-item" v-for="(item,index) in dataList" :key="index">
            <div class="br1">
              <div class="l">
                <div class="p">{{ item.createDateStr }}</div>
                <div class="span">{{ item.createTimeStr }}</div>
              </div>
              <div class="c">
                {{ item.type === 8 ? $t('assets.type8') : $t('assets.type9') }}
              </div>
              <div class="r">
                <div class="p">+{{ item.amount }}</div>
                <div class="span">USDT</div>
              </div>
            </div>
        </div>
    </van-list>      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'

const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'teamCommission'
})

const dataList = ref([])
const status = ref<number>(8)
let page = {
  pageSize: 10,
  pageNum: 1,
  type: [8]
}
const isLoading =ref(false) 
const isFinished =ref(false)
const getList = () => {
  page.type = [status.value]
  isFinished.value = false
  isLoading.value = true
  proxy.$api.walletRecord(page).then((res: any) => {
    isLoading.value = false
    if (res.code !== 200) {
        isFinished.value = true
        return
    }
    let list = res.data&&res.data.records || []
    dataList.value.push(...list) 
    page.pageNum = res.data.current+1
    if(res.data.size*res.data.current >= res.data.total){
        isFinished.value = res.data.size*res.data.current >= res.data.total
        page.pageNum = res.data.current
    }
  }).catch(()=>{
     isLoading.value = false
     isFinished.value = true
  })
}

const tabClick = (cur: number) => {
  status.value = cur
  page.pageNum = 1
  dataList.value =[]
  getList()
}

</script>
<style lang="scss" scoped>
@import './teamCommission.scss';
</style>
